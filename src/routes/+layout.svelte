<script lang="ts">
	import '../app.css';
	import Footer from './footer.svelte'
	import Header from './header.svelte';
</script>

<div class="app">
	<Header/>
	<main>
		<slot />
	</main>
	<Footer/>
</div>