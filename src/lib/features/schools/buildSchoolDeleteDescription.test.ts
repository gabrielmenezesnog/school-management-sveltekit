import { describe, expect, it } from 'vitest';
import { buildSchoolDeleteDescription } from './buildSchoolDeleteDescription';

describe('buildSchoolDeleteDescription', () => {
	it('describes deletion without linked classes', () => {
		const description = buildSchoolDeleteDescription({
			schoolName: 'Lincoln Elementary',
			classCount: 0
		});

		expect(description).toBe(
			'This will permanently remove Lincoln Elementary. This action cannot be undone.'
		);
	});

	it('describes deletion with one linked class', () => {
		const description = buildSchoolDeleteDescription({
			schoolName: 'Lincoln Elementary',
			classCount: 1
		});

		expect(description).toBe(
			'This will permanently remove Lincoln Elementary and all 1 linked class. This action cannot be undone.'
		);
	});

	it('describes deletion with multiple linked classes', () => {
		const description = buildSchoolDeleteDescription({
			schoolName: 'Lincoln Elementary',
			classCount: 4
		});

		expect(description).toBe(
			'This will permanently remove Lincoln Elementary and all 4 linked classes. This action cannot be undone.'
		);
	});
});
