const DIGITS_ONLY_REGEX = /\D/g;
const BRAZIL_LANDLINE_DIGIT_COUNT = 10;
const BRAZIL_MOBILE_DIGIT_COUNT = 11;

export function formatPhone(phone: string): string {
	const digits = phone.replace(DIGITS_ONLY_REGEX, '');

	if (!digits) {
		return '';
	}

	if (digits.length === BRAZIL_LANDLINE_DIGIT_COUNT) {
		const areaCode = digits.slice(0, 2);
		const prefix = digits.slice(2, 6);
		const suffix = digits.slice(6);

		return `(${areaCode}) ${prefix}-${suffix}`;
	}

	if (digits.length === BRAZIL_MOBILE_DIGIT_COUNT) {
		const areaCode = digits.slice(0, 2);
		const prefix = digits.slice(2, 7);
		const suffix = digits.slice(7);

		return `(${areaCode}) ${prefix}-${suffix}`;
	}

	return phone.trim();
}
