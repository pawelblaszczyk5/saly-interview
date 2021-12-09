import type { RequestTokenResponse } from '$lib/model/requestTokenResponse';
import type { SessionResponse } from '$lib/model/sessionResponse';
import type { SessionWithLoginResponse } from '$lib/model/sessionWithLoginResponse';

import { PARAMS_WITH_API_KEY } from '$lib/constants/paramsWithApiKey';
import { API_URL_PREFIX } from '$lib/constants/apiUrlPrefix';

export const createSession = async (): Promise<string> => {
	const requestTokenResponse: RequestTokenResponse = await (
		await fetch(`${API_URL_PREFIX}/authentication/token/new?${PARAMS_WITH_API_KEY}`)
	).json();

	const sessionWithLoginResponse: SessionWithLoginResponse = await (
		await fetch(
			`${API_URL_PREFIX}/authentication/token/validate_with_login?${PARAMS_WITH_API_KEY}`,
			{
				body: JSON.stringify({
					username: import.meta.env.VITE_TMDB_USERNAME,
					password: import.meta.env.VITE_TMDB_PASSWORD,
					request_token: requestTokenResponse.request_token,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			},
		)
	).json();

	const sessionResponse: SessionResponse = await (
		await fetch(`${API_URL_PREFIX}/authentication/session/new?${PARAMS_WITH_API_KEY}`, {
			body: JSON.stringify({
				request_token: sessionWithLoginResponse.request_token,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		})
	).json();

	return sessionResponse.session_id;
};
