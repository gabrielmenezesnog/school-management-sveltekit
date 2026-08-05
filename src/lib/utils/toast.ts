import { toast } from 'svelte-sonner';

const SUCCESS_TOAST_DURATION_MS = 4000;
const ERROR_TOAST_DURATION_MS = 6000;

export function showSuccessToast(title: string): void {
	toast.success(title, {
		duration: SUCCESS_TOAST_DURATION_MS
	});
}

export function showErrorToast(title: string): void {
	toast.error(title, {
		duration: ERROR_TOAST_DURATION_MS
	});
}
