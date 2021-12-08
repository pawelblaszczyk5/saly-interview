export const parseCookies = (cookiesString: string): Record<string, string> =>
	Object.fromEntries(
		cookiesString
			.split(';')
			.map((singleCookie) =>
				singleCookie.split('=').map((cookieValueOrName) => cookieValueOrName.trim()),
			),
	);
