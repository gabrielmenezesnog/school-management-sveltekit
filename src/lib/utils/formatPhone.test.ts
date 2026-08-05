import { describe, expect, it } from 'vitest';
import { formatPhone } from './formatPhone';

describe('formatPhone', () => {
	it('formats a 10-digit landline number', () => {
		expect(formatPhone('1132114500')).toBe('(11) 3211-4500');
	});

	it('formats an 11-digit mobile number', () => {
		expect(formatPhone('11987654321')).toBe('(11) 98765-4321');
	});

	it('keeps an already formatted phone when digit length is unexpected', () => {
		expect(formatPhone('(11) 3211-4500')).toBe('(11) 3211-4500');
	});

	it('returns an empty string for blank input', () => {
		expect(formatPhone('   ')).toBe('');
	});
});
