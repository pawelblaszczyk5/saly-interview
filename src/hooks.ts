import type { Handle } from '@sveltejs/kit';

import { parseCookies } from '$lib/helpers/parseCookies';
import { createSession } from '$lib/helpers/createSession';
import { SESSION_COOKIE_NAME } from '$lib/constants/sessionCookieName';

const SESSION_COOKIE_EXPIRY_TIME = 7_140;

export const handle: Handle = async ({ request, resolve }) => {
	const cookies = parseCookies(request.headers.cookie ?? '');

	if (cookies[SESSION_COOKIE_NAME]) {
		return await resolve(request);
	}

	const sessionId = await createSession();
	const response = await resolve({
		...request,
		headers: {
			...request.headers,
			cookie: request.headers.cookies ?? '' + `${SESSION_COOKIE_NAME}=${sessionId};`,
		},
	});

	return {
		...response,
		headers: {
			...response.headers,
			'set-cookie': `${SESSION_COOKIE_NAME}=${sessionId}; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_COOKIE_EXPIRY_TIME}`,
		},
	};
};
