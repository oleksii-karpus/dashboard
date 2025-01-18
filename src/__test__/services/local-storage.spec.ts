import { localStorageService } from '../../services/local-storage';

describe('LocalStorageService', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('should add string to local storage', () => {
        const id = '123';
        const data = 'some string';
        localStorageService.set(id, data);
        expect(window.localStorage.getItem(id)).toEqual(data);
    });

    it('should retrieve string from local storage', () => {
        const id = '123';
        const data = 'some string';
        window.localStorage.setItem(id, data);
        expect(localStorageService.get(id)).toEqual(data);
    });

    it('should overwrite data in local storage', () => {
        const id = '123';
        const oldData = 'example';
        const newData = 'new';
        window.localStorage.setItem(id, oldData);
        localStorageService.set(id, newData);
        expect(window.localStorage.getItem(id)).toEqual(newData);
    });

    it('should remove data from local storage', () => {
        const id = '123';
        const data = 'some string';
        window.localStorage.setItem(id, data);
        localStorageService.remove(id);
        expect(window.localStorage.getItem(id)).toBeNull();
    });

    it('should add object to local storage', () => {
        const id = '123';
        const data = { data: 1 };
        localStorageService.setObject(id, data);
        expect(window.localStorage.getItem(id)).toEqual(JSON.stringify(data));
    });

    it('should retrieve object from local storage', () => {
        const id = '123';
        const data = { data: 1 };
        window.localStorage.setItem(id, JSON.stringify(data));
        expect(localStorageService.getObject(id)).toEqual(data);
    });

    it('should add array to local storage', () => {
        const id = '123';
        const data = ['1'];
        localStorageService.setObject(id, data);
        expect(window.localStorage.getItem(id)).toEqual(JSON.stringify(data));
    });

    it('should retrieve array from local storage', () => {
        const id = '123';
        const data = ['1'];
        window.localStorage.setItem(id, JSON.stringify(data));
        expect(localStorageService.getObject(id)).toEqual(data);
    });

    it('should return null if key does not exist', () => {
        expect(localStorageService.get('nonexistent')).toBeNull();
        expect(localStorageService.getObject('nonexistent')).toBeNull();
    });

    it('should handle invalid JSON gracefully', () => {
        const id = 'invalid';
        window.localStorage.setItem(id, '{invalid JSON');
        expect(localStorageService.getObject(id)).toBeNull();
    });

    it('should not throw when removing nonexistent key', () => {
        expect(() => localStorageService.remove('nonexistent')).not.toThrow();
    });
});
