import { getUserFromJwt } from '$lib/server/AuthService';
import { getTheme } from '$lib/theme';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const jwt = event.cookies.get('jwt');
	const user = await getUserFromJwt(jwt);

	const storedTheme = event.cookies.get('theme');
	const theme = getTheme(storedTheme);

	event.locals.user = user;
	event.locals.theme = theme;

	return await resolve(event);
};
