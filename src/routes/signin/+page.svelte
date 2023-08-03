<script lang="ts">
  import { enhance } from '$app/forms';
</script>

<h1>Sign in</h1>

<form method="POST" use:enhance action="?/signIn">
  <label class="label mb-4" for="username">
    <span>Username</span>
    <input class="input" name="username" id="username" />
  </label>
  <label class="label mb-4" for="password">
    <span>Password</span>
    <input class="input" type="password" name="password" id="password" />
  </label>
  <button class="btn variant-filled">Sign in</button>
</form>

<p>Don't have an account? <a href="/signup">Sign up</a>.</p>
