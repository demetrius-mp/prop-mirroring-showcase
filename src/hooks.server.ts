import { getUserFromJwt } from '$lib/server/AuthService';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const jwt = event.cookies.get('jwt');
	const user = await getUserFromJwt(jwt);

	event.locals.user = user;

	return await resolve(event);
};
