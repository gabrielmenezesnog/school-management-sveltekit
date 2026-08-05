import { ApiRequestError } from '$lib/services/api/ApiRequestError';

export function getClientErrorMessage(error: Error, fallbackMessage: string): string {
	if (error instanceof ApiRequestError) {
		return error.message;
	}

	if (error.message) {
		return error.message;
	}

	return fallbackMessage;
}
