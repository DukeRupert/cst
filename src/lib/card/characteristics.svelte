<script lang="ts">
	import { GridItem, type LayoutChangeDetail } from 'svelte-grid-extended';
	import type { Characteristics } from './types';
	let {
		id,
		x = $bindable(),
		y = $bindable(),
		w = $bindable(),
		h = $bindable(),
		data = $bindable()
	}: Characteristics = $props();

	let edit = $state(false);
	let is_wide = $derived(x > 4);
	$inspect(is_wide);
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

	function handleChange(event: CustomEvent<LayoutChangeDetail>) {
		if (event.detail.item.w > 4) {
			is_wide = true;
		} else {
			is_wide = false;
		}
	}
</script>

<button {id} ondblclick={handleDoubleClick} ontouchend={handleDoubleTap}>
	<GridItem bind:x bind:y bind:w bind:h on:change={handleChange}>
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
		>
			<div class="flex h-full flex-col">
				<!-- Box 1 (Small) -->
				<div class="flex flex-row">
					<div class="shrink-0 bg-black p-2 text-base text-white">
						{#if edit}
							<input id="ancestry-title" bind:value={data.title} onkeydown={handleEnter} />
						{:else}
							<h3>{data.title}</h3>
						{/if}
					</div>
					<div class="flex-grow p-2 text-base">
						{#if edit}
							<input id="ancestry-name" bind:value={data.name} onkeydown={handleEnter} />
						{:else}
							<p>{data.name}</p>
						{/if}
					</div>
				</div>

				<!-- Box 2 (Flexible - takes remaining space) -->
				<div
					class="flex flex-grow flex-col items-center justify-center overflow-hidden p-4 text-base"
				>
					{#if edit}
						<textarea
							id="ancestry-description"
							rows="4"
							class="block w-full max-w-sm min-w-0 h-full rounded-md py-1.5 pr-3 pl-1 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 sm:text-sm/6"
							bind:value={data.description}
							onkeydown={handleEnter}
						></textarea>
					{:else}
						<p>{data?.description ?? 'Double tap/click to edit'}</p>
					{/if}
				</div>

				<!-- Box 3 (Small) -->
				<div class="p-2">
					<div class="grid grid-cols-3 gap-4">
						<!-- Column 1 -->
						<div class="flex {is_wide ? 'flex-row items-center' : 'flex-col items-start'}">
							<label for="lifespan" class="block text-sm/6 font-medium text-gray-900"
								>Lifespan</label
							>
							<div>
								<div class="flex items-center rounded-md">
									{#if edit}
										<input
											id="ancestry-lifespan"
											type="text"
											bind:value={data.lifespan}
											onkeydown={handleEnter}
											class="block w-full min-w-0 rounded-md py-1.5 pr-3 pl-1 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 sm:text-sm/6"
											placeholder="00+00"
										/>
									{:else}
										<p
											class="py-1.5 pr-3 pl-1 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
										>
											{data.lifespan}
										</p>
									{/if}
								</div>
							</div>
						</div>

						<!-- Column 2 -->
						<div class="flex {is_wide ? 'flex-row items-center' : 'flex-col items-start'}">
							<label for="age" class="block text-sm/6 font-medium text-gray-900">Age</label>
							<div>
								<div class="flex items-center rounded-md">
									{#if edit}
										<input
											id="ancestry-age"
											type="text"
											bind:value={data.age}
											onkeydown={handleEnter}
											class="block w-full min-w-0 rounded-md py-1.5 pr-3 pl-1 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 sm:text-sm/6"
											placeholder="00"
										/>
									{:else}
										<p
											class="py-1.5 pr-3 pl-1 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
										>
											{data.age}
										</p>
									{/if}
								</div>
							</div>
						</div>

						<!-- Column 3 -->
						<div class="flex {is_wide ? 'flex-row items-center' : 'flex-col items-start'}">
							<label for="size" class="block text-sm/6 font-medium text-gray-900">Size</label>
							<div>
								<div class="flex items-center rounded-md">
									{#if edit}
										<input
											id="ancestry-size"
											type="text"
											bind:value={data.size}
											onkeydown={handleEnter}
											class="block w-full min-w-0 rounded-md py-1.5 pr-3 pl-1 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 sm:text-sm/6"
											placeholder="00"
										/>
									{:else}
										<p
											class="py-1.5 pr-3 pl-1 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
										>
											{data.size}
										</p>
									{/if}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</GridItem>
</button>