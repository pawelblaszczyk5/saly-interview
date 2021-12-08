<script lang="ts">
	import type { MemberToDisplay } from '$lib/model/memberToDisplay';
	import placeholderImage from '$lib/assets/placeholder-image.jpg';

	export let members: Array<MemberToDisplay>;
</script>

<div class="members-list">
	{#each members as member (member.name + member.role)}
		<div class="members-list__member">
			<img
				loading="lazy"
				class="members-list__member-photo"
				src={member.profile_path
					? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${member.profile_path}`
					: placeholderImage}
				alt=""
			/>
			<h3 class="members-list__member-name">{member.name}</h3>
			<h4 class="members-list__member-role">{member.role}</h4>
		</div>
	{/each}
</div>

<style lang="postcss">
	.members-list {
		display: flex;
		overflow: auto;
		padding: 8px 4px;
		margin: -4px;
		gap: clamp(0.5rem, 3vw - 0.25rem, 1rem);

		&__member {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: clamp(0.5rem, 2vw - 0.25rem, 0.75rem);
			width: calc(50% - 1 / 2 * clamp(0.5rem, 3vw - 0.25rem, 1rem));
			flex-shrink: 0;
			box-shadow: var(--secondary-box-shadow);
			padding: 0.5rem clamp(0.5rem, 5vw - 0.75rem, 2.188rem);
			text-align: center;

			@media screen and (min-width: 768px) {
				width: calc(100% / 3 - 2 / 3 * clamp(0.5rem, 3vw - 0.25rem, 1rem));
			}

			@media screen and (min-width: 1280px) {
				width: calc(25% - 3 / 4 * clamp(0.5rem, 3vw - 0.25rem, 1rem));
			}

			@media screen and (min-width: 1536px) {
				width: calc(20% - 4 / 5 * clamp(0.5rem, 3vw - 0.25rem, 1rem));
			}
		}

		&__member-photo {
			max-width: 100%;
			width: 100%;
			height: 100%;
			object-fit: cover;
			border-radius: 5px;
			background-color: var(--primary-accent-background);
		}

		&__member-name {
			font-weight: 500;
			font-size: clamp(1rem, 5vw - 0.75rem, 1.5rem);
		}

		&__member-role {
			font-size: clamp(0.75rem, 5vw - 0.75rem, 1.125rem);
			font-weight: 400;
			color: var(--primary-accent-font);
		}
	}
</style>
