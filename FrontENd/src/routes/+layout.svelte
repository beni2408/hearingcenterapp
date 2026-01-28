<script>
	import favicon from '$lib/assets/favicon.svg';
  import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import '@fortawesome/fontawesome-free/css/all.css';
	import '../app.css';   

  import "../app.css"
	
	let { children } = $props();
</script>

<Navbar/>
<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


{@render children()}

<Footer/>
