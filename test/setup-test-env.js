import '@testing-library/jest-dom/extend-expect';
// polyfill fetch
import 'whatwg-fetch';
// mock server
import { server } from './mock-contact-form/server';
// initialize mock server before each test
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
