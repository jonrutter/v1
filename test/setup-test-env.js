import '@testing-library/jest-dom/extend-expect';
// polyfill fetch
import 'whatwg-fetch';
// mock server
import { server } from './mock-contact-form/server';
// intersection observer
import './__mocks__/intersection-observer';

// initialize mock server before each test
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
