import type { CreateListResponse } from '$lib/model/createListResponse';
import type { ListToDisplay } from '$lib/model/listToDisplay';
import type { RequestHandler } from '@sveltejs/kit';

import { API_URL_PREFIX } from '$lib/constants/apiUrlPrefix';
import { LANGUAGE } from '$lib/constants/language';
import { getParamsWithSessionId } from '$lib/helpers/getParamsWithSessionId';

export const post: RequestHandler<Record<string, unknown>, Omit<ListToDisplay, 'id'>> = async (
	request,
) => {
	const { description, name } = request.body;
	const params = getParamsWithSessionId(request);

	params.set('language', LANGUAGE);

	const { list_id }: CreateListResponse = await (
		await fetch(`${API_URL_PREFIX}list?${params}`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ description, name, language: LANGUAGE }),
		})
	).json();

	return {
		body: {
			listId: list_id,
		},
	};
};
