<script lang="ts">
	import Grid from 'svelte-grid-extended';
	import type { CardTypes } from './types';
	import SimpleCard from './simple.svelte';

	interface Props {
		items: CardTypes.Simple[];
		itemSize: { height: number };
	}

	let { items, itemSize = { height: 40 } }: Props = $props();

	const itemsBackup = structuredClone(items);

	let i = $state(items);
	$inspect(i);

	function resetItems(): void {
		i = structuredClone(itemsBackup);
	}
</script>

<button class="m-2 rounded-md border border-teal-400 px-4 py-2" onclick={resetItems}>Reset</button>
<Grid {itemSize} collision="push" cols={10} class="min-h-screen">
	{#each i as item (item.id)}
		{#if item.type === 'simple'}
			<SimpleCard
				type={item.type}
				bind:x={item.x}
				bind:y={item.y}
				bind:h={item.h}
				bind:w={item.w}
				bind:data={item.data}
				id={item.id}
			/>
		{/if}
	{/each}
</Grid>
