import { products } from './products.module';

describe('products', () => {
    it('should work', () => {
        expect(products()).toEqual('products');
    });
});
