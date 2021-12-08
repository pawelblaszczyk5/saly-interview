import type { ServerRequest } from '@sveltejs/kit/types/hooks';

import { PARAMS_WITH_API_KEY } from '$lib/constants/paramsWithApiKey';
import { SESSION_COOKIE_NAME } from '$lib/constants/sessionCookieName';
import { parseCookies } from '$lib/helpers/parseCookies';

const getSessionIdFromRequest = (request: ServerRequest): string =>
	parseCookies(request.headers.cookie)[SESSION_COOKIE_NAME];

export const getParamsWithSessionId = (request: ServerRequest): URLSearchParams => {
	const paramsWithSessionId = new URLSearchParams(PARAMS_WITH_API_KEY);

	paramsWithSessionId.set('session_id', getSessionIdFromRequest(request));

	return paramsWithSessionId;
};
