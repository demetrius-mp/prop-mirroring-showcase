// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		user?: Omit<import('@prisma/client').User, 'password'>;
	}
	interface PageData {
		user?: Locals['user'];
	}
	// interface Error {}
	// interface Platform {}
}
