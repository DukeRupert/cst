<script lang="ts">
	interface Base {
		name: string;
	}
	interface Props {
		data: Base;
	}
	let { data = { name: 'Base' } }: Props = $props();
</script>

<div
	id="card"
	class="relative h-full w-full border-t-1 border-r-2 border-b-4 border-l-1 border-black bg-white"
>
	<div class="absolute top-0 left-0 min-w-12 bg-black p-2 text-center text-sm text-white">
		<h3>{data.name}</h3>
	</div>
	<div
		class="grid h-full w-full grid-cols-1 grid-rows-1 items-center justify-items-center text-2xl"
	>
		Character name
	</div>
</div>
