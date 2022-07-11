import { rest } from 'msw';

const handlers = [
  rest.post(
    'https://www.admin.jonrutter.io/wp-json/contact-form-7/v1/contact-forms/7/feedback',
    async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ status: 'success' }));
    }
  ),
];

export { handlers };
