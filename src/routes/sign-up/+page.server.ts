import formDataToJSON from '$lib/formDataToJSON';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { invalid, redirect } from '@sveltejs/kit';
import db from '$lib/server/db';
import AuthService from '$lib/server/AuthService';

const signUpSchema = z
	.object({
		name: z.string().min(3),
		email: z.string().email(),
		password: z.string().min(8, 'Password must contain at least 8 character(s)'),
		confirmPassword: z.string().min(8)
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword']
	});

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/app');
	}
};

export const actions: Actions = {
	default: async ({ request }) => {
		type ValidationError = z.ZodFormattedError<z.infer<typeof signUpSchema>>;

		const formData = await request.formData();
		const json = formDataToJSON(formData);

		const parsedData = await signUpSchema.safeParseAsync(json);

		if (!parsedData.success) {
			return invalid(400, parsedData.error.format());
		}

		const {
			data: { confirmPassword, ...data }
		} = parsedData;

		const existingUser = await db.user.findUnique({
			where: {
				email: data.email
			}
		});

		if (existingUser) {
			const zodError = new z.ZodError([
				{
					code: 'custom',
					message: 'This email is already being used',
					path: []
				}
			]);

			return invalid(400, zodError.format() as ValidationError);
		}

		await db.user.create({
			data: {
				...data,
				password: await AuthService.generatePasswordHash(data.password)
			},
			select: {
				id: true
			}
		});

		throw redirect(302, '/sign-in');
	}
};
