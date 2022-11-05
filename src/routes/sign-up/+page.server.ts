import formDataToJSON from '$lib/formDataToJSON';
import type { Actions } from './$types';
import { z } from 'zod';
import { invalid } from '@sveltejs/kit';

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

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const json = formDataToJSON(formData);

		const parsedData = await signUpSchema.safeParseAsync(json);

		if (!parsedData.success) {
			return invalid(400, parsedData.error.format());
		}

		return {
			success: true
		};
	}
};
