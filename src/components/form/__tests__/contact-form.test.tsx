import React from 'react';
import { render, screen, waitFor } from 'test-utils';
import userEvent from '@testing-library/user-event';

import { ContactForm } from '../contact-form';

const testData = {
  'your-name': 'Jon Rutter',
  'your-email': 'contact@jonrutter.io',
  'your-subject': 'Test Subject',
  'your-message': 'Test Message',
};

describe('Contact Form', () => {
  it('renders correctly', () => {
    render(<ContactForm />);
  });
  it('produces error messages correctly', async () => {
    render(<ContactForm />);

    // select fields
    const submitButton = screen.getByRole('button');
    const nameField = screen.getByLabelText(/name/i);
    const emailField = screen.getByLabelText(/email/i);
    const subjectField = screen.getByLabelText(/subject/i);
    const messageField = screen.getByLabelText(/message/i);

    // pressing submit with completely empty fields creates error messages
    await userEvent.click(submitButton);
    await waitFor(() => {
      screen.getAllByText(/this field is required/i);
    });

    // entering an invalid email in the email field will produce a different error message
    await userEvent.type(emailField, 'c');
    await waitFor(() => {
      screen.getByText(/enter a valid email/i);
    });

    // all error messages should disappear when fields are correctly filled
    await userEvent.type(nameField, 'Jon Rutter');
    await userEvent.type(emailField, 'ontact@jonrutter.io');
    await userEvent.type(subjectField, 'Test Subject');
    await userEvent.type(messageField, 'Test Message');

    await waitFor(() => {
      expect(
        screen.queryByText(/enter a valid email/i)
      ).not.toBeInTheDocument();
      expect(screen.queryAllByText(/this field is required/i)).toHaveLength(0);
    });
  });
  it('correctly submits data', async () => {
    render(<ContactForm />);

    // select fields
    const submitButton = screen.getByRole('button');
    const nameField = screen.getByLabelText(/name/i);
    const emailField = screen.getByLabelText(/email/i);
    const subjectField = screen.getByLabelText(/subject/i);
    const messageField = screen.getByLabelText(/message/i);

    // enter stock information
    await userEvent.type(nameField, testData['your-name']);
    await userEvent.type(emailField, testData['your-email']);
    await userEvent.type(subjectField, testData['your-subject']);
    await userEvent.type(messageField, testData['your-message']);

    userEvent.click(submitButton);

    await waitFor(() => {
      let errorMessage = screen.queryByText(/there was an error/i);
      expect(errorMessage).not.toBeInTheDocument();
    });
  });
});
