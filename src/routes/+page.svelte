<script lang="ts">
	import Grid from '$lib/card/grid.svelte';
	import type { CardTypes } from '$lib/card/types';

	const itemSize = { height: 40 };

	let simpleCard: CardTypes.Simple = {
		id: 'simple',
		type: 'simple',
		x: 0,
		y: 0,
		h: 2,
		w: 7,
		data: {
			title: 'Name',
			content: 'Character Name',
			size: 'xl'
		}
	};
	let ancestryCard: CardTypes.Ancestry = {
		id: 'ancestry',
		type: 'ancestry',
		x: 0,
		y: 2,
		h: 6,
		w: 7,
		data: {
			title: 'Ancestry',
			name: 'Ancestry Name',
			description: '',
			lifespan: '',
			age: '',
			size: ''
		}
	};
	let items = [simpleCard, ancestryCard];
</script>

<Grid {items} {itemSize} />
