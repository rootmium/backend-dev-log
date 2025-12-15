<script>
	import Thing from '../../components/Thing.svelte';
	import { roll } from '../../utils/rolldice.js';
	let promise = $state(roll());
	let count = $state(0);
	let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
	let selected = $state(colors[0]);

	let things = $state([
		{ id: 1, name: 'apple' },
		{ id: 2, name: 'banana' },
		{ id: 3, name: 'carrot' },
		{ id: 4, name: 'doughnut' },
		{ id: 5, name: 'egg' }
	]);
</script>

<h1>Welcome to the page</h1>
<p>Count is: {count}</p>
<!-- <button onclick={() => count++}>Increase count</button> -->

{#if count > 10}
	<p>Count is now greater than 10</p>
{:else if count < 5}
	<p>Count is less than 5</p>
{:else}
	<p>Count is greater than or equal to 5 and less than or equal to 10</p>
{/if}

<!-- {#if true} -->
<!-- {:else if true} -->
<!-- {:else} -->
<!-- {/if} -->

<h1 style="color: {selected}">Change color of this heading</h1>

<div>
	{#each colors as color}
		<button
			style="background: {color}"
			aria-current={selected === color}
			aria-label={selected}
			onclick={() => {
				selected = color;
				console.log(selected);
			}}
		></button>
	{/each}
</div>

<button onclick={() => things.shift()}>Remove one element</button>

{#each things as thing (thing.id)}
	<Thing name={thing.name} />
{/each}

<button onclick={() => (promise = roll())}>Roll the dice</button>
{#await promise}
	<p>...rolling</p>
{:then number}
	<p>{number}</p>
{:catch error}
	<p style="color: red">{error}</p>
{/await}

<style>
	div {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-gap: 5px;
		max-width: 400px;
	}

	/* button { */
	/*   aspect-ratio: 1; */
	/*   border-radius: 50%; */
	/*   transform: translate(-2px, -2px); */
	/* } */
	/**/
	/* button[aria-current="true"] { */
	/*   transform: none; */
	/*   border: none; */
	/* } */
</style>
