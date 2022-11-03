import formDataToJSON from '$lib/formDataToJSON';
import type { Actions } from './$types';
import { z } from 'zod';
import { invalid } from '@sveltejs/kit';

const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, 'Password must contain at least 8 character(s)')
});

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const json = formDataToJSON(formData);

		const parsedData = await signInSchema.safeParseAsync(json);

		if (!parsedData.success) {
			return invalid(400, parsedData.error.format());
		}

		return {
			success: true
		};
	}
};
