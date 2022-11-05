import formDataToJSON from '$lib/formDataToJSON';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { invalid, redirect } from '@sveltejs/kit';
import db from '$lib/server/db';
import AuthService from '$lib/server/AuthService';
import { NODE_ENV } from '$env/static/private';

const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, 'Password must contain at least 8 character(s)')
});

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/app');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		type ValidationError = z.ZodFormattedError<z.infer<typeof signInSchema>>;

		const formData = await request.formData();
		const json = formDataToJSON(formData);

		const parsedData = await signInSchema.safeParseAsync(json);

		if (!parsedData.success) {
			return invalid(400, parsedData.error.format());
		}

		const { data } = parsedData;

		const user = await db.user.findUnique({
			where: {
				email: data.email
			}
		});

		if (!user || !AuthService.verifyPassword(data.password, user.password)) {
			const zodError = new z.ZodError([
				{
					code: 'custom',
					message: 'Invalid credentials',
					path: []
				}
			]);

			return invalid(400, zodError.format() as ValidationError);
		}

		const jwt = AuthService.generateJwt({
			userId: user.id
		});

		cookies.set('jwt', jwt, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 30
		});

		throw redirect(302, '/app');
	}
};
