import { render, screen } from '@testing-library/react';
import React from 'react';

test('jsdom works', () => {
  document.body.innerHTML = '<div>Test</div>';
  const el = document.querySelector('div');
  expect(el.textContent).toBe('Test');
});
