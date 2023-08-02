<script lang="ts">
  import '@skeletonlabs/skeleton/themes/theme-modern.css';
  import '@skeletonlabs/skeleton/styles/skeleton.css';
  import '../app.postcss';
  import { AppBar, AppShell, Drawer, drawerStore } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';
  import IconMenu from '~icons/tabler/menu-2';
  import IconX from '~icons/tabler/x';

  export let data;

  $: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500' : '');

  function drawerOpen(): void {
    drawerStore.open({});
  }

  function drawerClose(): void {
    drawerStore.close();
  }
</script>

<Drawer positon="right">
  <div class="p-7">
    <button type="button" class="btn-icon variant-filled" on:click={drawerClose}><IconX /></button>
  </div>
  <hr />
  <nav class="list-nav p-4">
    <ul>
      <li><a class={classesActive('/')} href="/" on:click={drawerClose}>Home</a></li>
      <li><a class={classesActive('/about')} href="/about" on:click={drawerClose}>About</a></li>
      {#if data.userId}
        <li>
          <form method="POST" action="?/signOut">
            <button on:click={drawerClose}>Sign out</button>
          </form>
        </li>
      {:else}
        <li><a href="/signin" on:click={drawerClose}>Sign in</a></li>
        <li><a href="/signup" on:click={drawerClose}>Sign up</a></li>
      {/if}
    </ul>
  </nav>
</Drawer>

<!-- TODO: Possibly remove the AppShell since it can mess with mobile scroll according to the docs -->
<AppShell>
  <svelte:fragment slot="header">
    <AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
      <svelte:fragment slot="lead">SvelteKit Turso Drizzle Starter</svelte:fragment>
      <svelte:fragment slot="trail">
        <button type="button" class="btn-icon variant-filled" on:click={drawerOpen}
          ><IconMenu /></button
        >
        <div class="card w-48 shadow-xl py-2" data-popup="menuPopup">
          <div class="arrow bg-surface-100-800-token" />
        </div>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <div class="container mx-auto p-8 space-y-8">
    <slot />
  </div>
  <!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
</AppShell>
