<script lang="ts">
	import Grid from '$lib/card/grid.svelte';
	import type { CardTypes } from '$lib/card/types';

	const itemSize = { height: 40 };

	let card: CardTypes.Simple = {
		id: 'test',
		type: 'simple',
		x: 0,
		y: 0,
		h: 2,
		w: 3,
		data: {
			name: 'Name',
			content: 'Character Name',
			size: 'xl'
		}
	};
	let items = [card];
</script>

<Grid {items} {itemSize} />
