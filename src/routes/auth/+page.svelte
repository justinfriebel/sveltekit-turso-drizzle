<script lang="ts">
  import type { ActionData } from './$types';

  export let form: ActionData;
</script>

<form method="POST" action="?/signIn">
  <label class="label mb-4">
    <span>Email</span>
    <input class="input" type="email" placeholder="email@gmail.com" name="email" />
  </label>
  <label class="label mb-4">
    <span>Password</span>
    <input class="input" type="password" placeholder="yourPassword123" name="password" />
  </label>
  <button class="btn variant-filled">Sign in</button>
  <span class="mx-4P">OR</span>
  <button class="btn variant-filled" formaction="?/signUp">Sign up</button>
</form>

{#if form?.error}
  <p class="text-error-500">{form.message}</p>
{/if}
