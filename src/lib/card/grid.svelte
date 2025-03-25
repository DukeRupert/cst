<script lang="ts">
	import type { CardTypes } from './types';
	import Grid from 'svelte-grid-extended';
	import SimpleCard from './simple.svelte';
	import AncestryCard from './ancestry.svelte';
	import { createCard } from './helper';

	interface Props {
		items: CardTypes.Item[];
		itemSize: { height: number };
	}

	let { items, itemSize = { height: 40 } }: Props = $props();

	const itemsBackup = structuredClone(items);

	let i = $state(items);

	function resetItems(): void {
		i = structuredClone(itemsBackup);
	}

	function is_wide(x: number): boolean {
		return x > 4
	}
	
	function addItem(type: string): void {
		let uuid = self.crypto.randomUUID();
		console.log(uuid);
		let card = createCard(type);
		if (typeof card === 'string') {
			window.alert(card);
			return;
		}
		card.id = uuid;
		i = [...i, card];
	}
</script>

<button class="m-2 rounded-md border border-teal-400 px-4 py-2" onclick={resetItems}>Reset</button>
<button class="m-2 rounded-md border border-teal-400 px-4 py-2" onclick={() => addItem('simple')}
	>Add Item</button
>
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
		{:else if item.type === 'ancestry'}
			<AncestryCard
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
