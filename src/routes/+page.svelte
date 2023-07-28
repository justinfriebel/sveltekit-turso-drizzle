<script>
  export let data;
</script>

<h1>Welcome to SvelteKit Turso DrizzleORM Starter</h1>

{#if data.email}
  <p>Logged in as {data.email}</p>
{:else}
  <a href="/auth">Sign in OR Sign up</a>
{/if}
