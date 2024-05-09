import {expect, describe, it} from '@jest/globals';
import {
  checkEmailAvailability,
  getProductsById,
  getRestaurants,
  userLogin,
} from '../page/api.js';

describe('get restaurants from backend', () => {
  it('should return a list of restaurants', async () => {
    const restaurants = await getRestaurants();
    expect(restaurants).toHaveLength(2);
  });
});

describe('check email availability', () => {
  it('should return a response that email is not used', async () => {
    const response = await checkEmailAvailability(
      'yesjdlksjlkdajslkdjaksldp@yedjfjlksjdflksdjfklsdjfp.yep'
    );
    expect(response).toBe(true);
  });

  it('should return a response that email is used', async () => {
    const response = await checkEmailAvailability('admin@admin.com');
    expect(response).toBe(false);
  });
});

describe('Login', () => {
  it('should return false if email is not registered', async () => {
    const userData = {
      email: 'idonot@exist.lul',
      password: 'password',
    };
    const response = await userLogin(userData);
    expect(response).toBe(false);
  });
});

describe('get product by id', () => {
  it('should return a product object', async () => {
    const product = await getProductsById(105);
    expect(product).toHaveProperty('id', 105);
  });
});
