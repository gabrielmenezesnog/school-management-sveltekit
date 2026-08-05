import { APPLICATION_JSON_MIME_TYPE, CONTENT_TYPE_HEADER_NAME } from '$lib/constants/apiMediaTypes';
import type { ApiErrorBody } from '$lib/types/ApiErrorBody';

const DEFAULT_API_ERROR_MESSAGE = 'Something went wrong. Please try again.';

function isApiErrorBody(value: object): value is ApiErrorBody {
	if (!('message' in value)) {
		return true;
	}

	return typeof value.message === 'string';
}

export async function getApiErrorMessage(response: Response): Promise<string> {
	const contentType = response.headers.get(CONTENT_TYPE_HEADER_NAME);
	const hasJsonBody = Boolean(contentType?.includes(APPLICATION_JSON_MIME_TYPE));

	if (!hasJsonBody) {
		return DEFAULT_API_ERROR_MESSAGE;
	}

	try {
		const responseText = await response.text();

		if (!responseText) {
			return DEFAULT_API_ERROR_MESSAGE;
		}

		const parsedBody = JSON.parse(responseText);

		if (typeof parsedBody !== 'object') {
			return DEFAULT_API_ERROR_MESSAGE;
		}

		if (!parsedBody) {
			return DEFAULT_API_ERROR_MESSAGE;
		}

		if (Array.isArray(parsedBody)) {
			return DEFAULT_API_ERROR_MESSAGE;
		}

		if (!isApiErrorBody(parsedBody)) {
			return DEFAULT_API_ERROR_MESSAGE;
		}

		if (parsedBody.message) {
			return parsedBody.message;
		}

		return DEFAULT_API_ERROR_MESSAGE;
	} catch {
		return DEFAULT_API_ERROR_MESSAGE;
	}
}
