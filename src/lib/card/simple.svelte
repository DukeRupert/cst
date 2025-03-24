<script lang="ts">
	import { GridItem } from 'svelte-grid-extended';
	import type { Simple } from './types';
	let {
		x = $bindable(),
		y = $bindable(),
		w = $bindable(),
		h = $bindable(),
		data = $bindable()
	}: Simple = $props();

	let edit = $state(false);
	let lastTap = $state(0);
	const DOUBLE_TAP_DELAY = 300; // milliseconds

	function handleDoubleClick() {
		console.log('Double click!');
		edit = !edit;
	}

	function handleDoubleTap(event: TouchEvent) {
		const currentTime = new Date().getTime();
		const tapLength = currentTime - lastTap;

		if (tapLength < DOUBLE_TAP_DELAY && tapLength > 0) {
			// Double tap detected
			console.log('Element was double-tapped!');
			event.preventDefault();
			edit = !edit;
		}

		lastTap = currentTime;
	}

	function handleEnter(event: KeyboardEvent): void {
		if (event.key === 'Enter') {
			edit = false;
		}
	}
</script>

<GridItem bind:x bind:y bind:w bind:h>
	<div
		id="card"
		role="button"
		tabindex="0"
		aria-label="Card content. Double-click to edit."
		aria-roledescription="Editable card"
		aria-haspopup="dialog"
		class="relative h-full w-full border-t-1 border-r-2 border-b-4 border-l-1 {edit
			? 'border-dotted'
			: 'border-solid'} bg-white"
		ondblclick={handleDoubleClick}
		ontouchend={handleDoubleTap}
	>
		<div class="absolute top-0 left-0 min-w-12 bg-black p-2 text-center text-sm text-white">
			{#if edit}
				<input id="simple-name" bind:value={data.name} onkeydown={handleEnter} />
			{:else}
				<h3>{data.name}</h3>
			{/if}
		</div>
		<div
			class="grid h-full w-full grid-cols-1 grid-rows-1 items-center justify-items-center text-2xl"
		>
			{#if edit}
				<input
					id="simple-content"
					class="box-border w-full"
					bind:value={data.content}
					onkeydown={handleEnter}
				/>
			{:else}
				<p>{data.content}</p>
			{/if}
		</div>
	</div>
</GridItem>
