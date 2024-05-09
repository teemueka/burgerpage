import {describe, expect, it} from '@jest/globals';
import {
  productErrors,
  userErrors,
  ingredientErrors,
} from '../page/validators/adminValidator.js';
import {
  validateEmail,
  validatePassword,
} from '../page/validators/userValidator.js';

describe('productErrors', () => {
  it('should return false for valid product data', () => {
    const productData = {name: 'Burger', price: 5, image: 'image.jpg'};
    expect(productErrors(productData)).toBe(false);
  });

  it('should return true if name is empty', () => {
    const productData = {name: ' ', price: 5, image: 'image.jpg'};
    expect(productErrors(productData)).toBe(true);
  });

  it('should return true if price is not a number', () => {
    const productData = {name: 'Burger', price: 'five', image: 'image.jpg'};
    expect(productErrors(productData)).toBe(true);
  });

  it('should return true if image is null', () => {
    const productData = {name: 'Burger', price: 5, image: null};
    expect(productErrors(productData)).toBe(true);
  });
});

describe('ingredientErrors', () => {
  it('should return false for valid ingredient data', () => {
    const ingredientData = {name: 'Tomato', cal: 20};
    expect(ingredientErrors(ingredientData)).toBe(false);
  });

  it('should return true if name is empty', () => {
    const ingredientData = {name: ' ', cal: 20};
    expect(ingredientErrors(ingredientData)).toBe(true);
  });

  it('should return true if calories are less than or equal to zero', () => {
    const ingredientData = {name: 'Tomato', cal: 0};
    expect(ingredientErrors(ingredientData)).toBe(true);
  });
});

describe('userErrors', () => {
  it('should return false for valid user data', () => {
    const validUser = {
      password: 'strongpassword1',
      email: 'goodtestmail@email.com',
    };

    const result = userErrors(validUser);
    expect(result).toBe(false);
  });
  it('should return true for invalid user data due to bad email format', () => {
    const invalidEmailUser = {
      password: 'strongpassword1',
      email: 'bademailformat',
    };

    const result = userErrors(invalidEmailUser);
    expect(result).toBe(true);
  });

  it('should return true for invalid user data due to weak password', () => {
    const weakPasswordUser = {
      password: '123',
      email: 'goodtestmail@email.com',
    };

    const result = userErrors(weakPasswordUser);
    expect(result).toBe(true);
  });
});

describe('validateEmail', () => {
  it('should return true for valid email addresses', () => {
    expect(validateEmail('example@example.com')).toBe(true);
    expect(validateEmail('user123@domain.co')).toBe(true);
    expect(validateEmail('name.surname@domain.info')).toBe(true);
  });

  it('should return false for invalid email addresses', () => {
    expect(validateEmail('example')).toBe(false);
    expect(validateEmail('example@')).toBe(false);
    expect(validateEmail('@example.com')).toBe(false);
    expect(validateEmail('user@domaincom')).toBe(false);
  });
});

describe('validatePassword', () => {
  it('should return true for valid passwords', () => {
    expect(validatePassword('abc12345')).toBe(true);
    expect(validatePassword('password9')).toBe(true);
    expect(validatePassword('1234abcd')).toBe(true);
  });

  it('should return false for invalid passwords', () => {
    expect(validatePassword('abcdefg')).toBe(false);
    expect(validatePassword('1234567')).toBe(false);
    expect(validatePassword('abc')).toBe(false);
    expect(validatePassword('123456a')).toBe(false);
  });
});
