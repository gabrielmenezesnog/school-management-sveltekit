import { describe, expect, it } from 'vitest';
import { buildClassDeleteDescription } from './buildClassDeleteDescription';

describe('buildClassDeleteDescription', () => {
	it('describes permanent removal for the school', () => {
		expect(
			buildClassDeleteDescription({
				className: '1st A',
				schoolName: 'Lincoln Elementary'
			})
		).toBe('This will permanently remove 1st A from Lincoln Elementary.');
	});
});
