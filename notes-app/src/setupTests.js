import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// This ensures that our components are unmounted and cleaned up after each test.
afterEach(() => {
    cleanup();
});