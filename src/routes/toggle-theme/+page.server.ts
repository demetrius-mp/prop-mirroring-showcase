import type { Theme } from '$lib/theme';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	throw redirect(302, '/');
};

export const actions: Actions = {
	default: async ({ cookies, locals, request }) => {
		const currentTheme = locals.theme;
		const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';

		const formData = await request.formData();
		const redirectTo = formData.get('redirect');

		cookies.set('theme', newTheme, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 30
		});

		throw redirect(302, (redirectTo as string) || '/');
	}
};
