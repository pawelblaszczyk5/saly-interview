import { API_URL_PREFIX } from '$lib/constants/apiUrlPrefix';
import { LANGUAGE } from '$lib/constants/language';
import { PARAMS_WITH_API_KEY } from '$lib/constants/paramsWithApiKey';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (request) => {
	const params = new URLSearchParams(PARAMS_WITH_API_KEY);

	params.set('language', LANGUAGE);

	const [details, credits] = await Promise.all([
		await (await fetch(`${API_URL_PREFIX}movie/${request.query.get('id')}?${params}`)).json(),
		await (
			await fetch(`${API_URL_PREFIX}movie/${request.query.get('id')}/credits?${params}`)
		).json(),
	]);

	return {
		body: {
			details,
			credits,
		},
	};
};
