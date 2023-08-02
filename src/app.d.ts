// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import 'unplugin-icons/types/svelte';
/// <reference types="lucia" />

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
    interface Locals {
      auth: import('lucia').AuthRequest;
    }
  }
  namespace Lucia {
    type Auth = import('$lib/server/lucia').Auth;
    type DatabaseUserAttributes = {
      username: string;
      email: string;
    };
    // eslint-disable-next-line @typescript-eslint/ban-types
    type DatabaseSessionAttributes = {};
  }
}

export {};
