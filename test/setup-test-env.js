import '@testing-library/jest-dom/extend-expect';
// polyfill fetch
import 'whatwg-fetch';
// mock server
import { server } from './mock-contact-form/server';

// mocks window.IntersectionObserver
import './__mocks__/intersection-observer';
// mocks window.scrollTo
import './__mocks__/scroll-to';

// initialize mock server before each test
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
