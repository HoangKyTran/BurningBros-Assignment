export enum ApiMethod {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
}

export const encodedParam = (param: object): string | void => {
	if (!Object.keys(param).length) return;

	const encodedParams = Object.entries(param).map(([key, value]) => {
		return `${key}=${encodeURIComponent(value)}`;
	});

	return `?${encodedParams.join("&")}`;
};
