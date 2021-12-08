import type { CastMember } from '$lib/model/castMember';
import type { CrewMember } from '$lib/model/crewMember';

export interface MovieCreditsResponse {
	id: number;
	cast: Array<CastMember>;
	crew: Array<CrewMember>;
}
