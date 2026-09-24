import test from 'node:test';
import assert from 'node:assert/strict';

import { getBreedRoute, getPuppyRoute, slugify, getBreedPages } from './seo.js';

test('breed routes use readable lowercase slugs', () => {
  assert.equal(getBreedRoute('Border Collie'), '/puppies/border-collie');
  assert.equal(getBreedRoute('French Bulldog'), '/puppies/french-bulldog');
});

test('puppy routes are derived from breed and name', () => {
  assert.equal(getPuppyRoute({ breed: 'border-collie', name: 'Luna', slug: 'luna' }), '/puppies/border-collie/luna');
  assert.equal(slugify('Épagneul Breton'), 'epagneul-breton');
});

test('breed catalog includes the public breed routes', () => {
  const breeds = getBreedPages();
  assert.ok(breeds.some((breed) => breed.slug === 'border-collie'));
  assert.ok(breeds.some((breed) => breed.slug === 'poodle'));
  assert.ok(breeds.some((breed) => breed.slug === 'french-bulldog'));
});
