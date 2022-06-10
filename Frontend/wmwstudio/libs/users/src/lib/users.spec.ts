import { users } from './users.module';

describe('users', () => {
    it('should work', () => {
        expect(users()).toEqual('users');
    });
});
