export const themes = ['light', 'dark'] as const;

export type Theme = typeof themes[number];

export const isTheme = (theme: unknown): theme is Theme =>
	typeof theme === 'string' && themes.includes(theme as Theme);

export function getTheme(theme?: string): Theme {
	return theme !== undefined && isTheme(theme) ? theme : 'light';
}
