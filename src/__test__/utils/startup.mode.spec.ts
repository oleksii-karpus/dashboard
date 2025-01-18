import { isDevelopment } from '../../utils/startup.mode.utils';

describe('isDevelopment', () => {
    it('should return true when mode is "development"', () => {
        expect(isDevelopment('development')).toBe(true);
    });

    it('should return false when mode is undefined', () => {
        expect(isDevelopment()).toBe(false);
    });

    it('should return false for any other mode', () => {
        expect(isDevelopment('production')).toBe(false);
        expect(isDevelopment('test')).toBe(false);
        expect(isDevelopment('staging')).toBe(false);
    });
});
