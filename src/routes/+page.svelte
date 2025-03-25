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
			name: 'Hakaan',
			description: 'In spite of their friendly, outgoing nature, the rare presence of a hakaan in human society is considered a harbinger - an omen of dark times. Descended from a tribe of giants in upper Vanigar, the original Haka’an tribe made a bargain with Holkatja the Vanigar trickster god. They traded some of their gigantic size and strength for the ability to see the future.',
			lifespan: '00+00',
			age: '00',
			size: '1L'
		}
	};
	let items = [simpleCard, ancestryCard];
</script>

<Grid {items} {itemSize} />
