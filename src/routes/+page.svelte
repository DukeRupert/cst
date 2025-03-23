<script lang="ts">
	import Grid, { GridItem } from 'svelte-grid-extended';
	import BaseCard from '$lib/card/base.svelte';

	const itemSize = { height: 40 };
</script>

<Grid {itemSize} collision="push" cols={10} class="min-h-screen">
	<GridItem x={1} y={0} class="bg-blue-300"><form><input type="text" /></form></GridItem>
	<GridItem x={3} y={3} w={4} class="bg-green-300">Hoy</GridItem>
	<GridItem x={0} y={1} w={4}><BaseCard data={{ name: 'Name' }}></BaseCard></GridItem>
</Grid>
