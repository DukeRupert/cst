<script lang="ts">
	import { GridItem } from 'svelte-grid-extended';
	import type { Ancestry } from './types';
	let {
		x = $bindable(),
		y = $bindable(),
		w = $bindable(),
		h = $bindable(),
		data = $bindable()
	}: Ancestry = $props();

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
				<input id="ancestry-title" bind:value={data.title} onkeydown={handleEnter} />
			{:else}
				<h3>{data.title}</h3>
			{/if}
		</div>
		<div class="flex h-full flex-col">
			<!-- Box 1 (Small) -->
			<div class="bg-blue-200 p-4 text-end">
				{#if edit}
					<input id="ancestry-name" bind:value={data.name} onkeydown={handleEnter} />
				{:else}
					<p>{data.name}</p>
				{/if}
			</div>

			<!-- Box 2 (Flexible - takes remaining space) -->
			<div class="flex-grow overflow-auto bg-green-200 p-4">
				{#if edit}
					<input id="ancestry-description" bind:value={data.description} onkeydown={handleEnter} />
				{:else}
					<p>{data.description}</p>
				{/if}
			</div>

			<!-- Box 3 (Small) -->
			<div class="p-4">
				<div class="grid grid-cols-3 gap-4">
					<!-- Column 1 -->
					<div class="flex flex-col lg:flex-row lg:gap-4 items-start lg:items-center">
						<label for="lifespan" class="block text-sm/6 font-medium text-gray-900">Lifespan</label>
						<div>
							<div
								class="flex items-center rounded-md"
							>
								{#if edit}
									<input
										id="ancestry-lifespan"
										type="text"
										bind:value={data.lifespan}
										onkeydown={handleEnter}
										class="block rounded-md min-w-0 grow py-1.5 pr-3 pl-1 text-sm text-gray-900 placeholder:text-gray-400 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 sm:text-sm/6"
										placeholder="00+00"
									/>
								{:else}
									<p class="py-1.5 pr-3 pl-1 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6">
										{data.lifespan}
									</p>
								{/if}
							</div>
						</div>
					</div>

					<!-- Column 2 -->
					<div>
						<label for="username2" class="block text-sm/6 font-medium text-gray-900">Profile</label>
						<div class="mt-2">
							<div
								class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
							>
								<div class="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
									profile.com/
								</div>
								<input
									type="text"
									name="username2"
									id="username2"
									class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
									placeholder="johnsmith"
								/>
							</div>
						</div>
					</div>

					<!-- Column 3 -->
					<div>
						<label for="username3" class="block text-sm/6 font-medium text-gray-900">Website</label>
						<div class="mt-2">
							<div
								class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
							>
								<div class="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
									website.com/
								</div>
								<input
									type="text"
									name="username3"
									id="username3"
									class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
									placeholder="samsmith"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</GridItem>
