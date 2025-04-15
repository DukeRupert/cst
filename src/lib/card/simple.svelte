<script lang="ts">
	import { GridItem, type LayoutChangeDetail } from 'svelte-grid-extended';
	import type { Simple } from './types';
	let {
		id,
		x = $bindable(),
		y = $bindable(),
		w = $bindable(),
		h = $bindable(),
		data = $bindable()
	}: Simple = $props();

	let edit = $state(false);
	let lastTap = $state(0);
	let is_wide = $derived(x > 4);
	let is_tall = $derived(x > 1);
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

	function handleChange(event: CustomEvent<LayoutChangeDetail>) {
		if (event.detail.item.w > 2) {
			is_wide = true;
		} else {
			is_wide = false;
		}
		if (event.detail.item.h > 1) {
			is_tall = true;
		} else {
			is_tall = false;
		}
	}
</script>

<GridItem bind:x bind:y bind:w bind:h on:change={handleChange}>
	<div
		id="card"
		role="button"
		tabindex="0"
		aria-label="Card content. Double-click to edit."
		aria-roledescription="Editable card"
		aria-haspopup="dialog"
		ondblclick={handleDoubleClick}
		ontouchend={handleDoubleTap}
		class="relative h-full w-full border-t-1 border-r-2 border-b-4 border-l-1 {edit
			? 'border-dotted'
			: 'border-solid'} bg-white"
	>
		<div class="flex h-full flex-col">
			<!-- Box 1 (Small) -->
			<div class="flex justify-start items-center gap-4 text-end">
				<div class="bg-black p-2 text-sm text-white">
					{#if edit}
						<input id="ancestry-title" bind:value={data.title} onkeydown={handleEnter} />
					{:else}
						<h3>{data.title}</h3>
					{/if}
				</div>
				<div class={is_tall ? 'hidden' : 'block'}>
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

			<!-- Box 2 (Flexible - takes remaining space) -->
			<div
				class="flex flex-grow flex-col items-center justify-center overflow-hidden p-4 {is_wide
					? 'text-2xl'
					: 'text-base'} {is_tall ? 'block' : 'hidden'}"
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
	</div>
</GridItem>
