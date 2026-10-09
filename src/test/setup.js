import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
// jsdom does not implement native dialog methods or scrolling. Actual focus behavior
// is verified separately in a browser; these stubs let integration tests mount dialogs.
HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute('open', '');
};
HTMLDialogElement.prototype.close = function () {
  this.removeAttribute('open');
};
HTMLElement.prototype.scrollIntoView = function () {};
