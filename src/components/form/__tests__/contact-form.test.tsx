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

const Component = <ContactForm sent={false} setSent={() => null} />;

describe('Contact Form', () => {
  it('renders correctly', () => {
    render(Component);
  });
  it('produces error messages correctly', async () => {
    render(Component);

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
    render(Component);

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

    await userEvent.click(submitButton);

    // the spinner should appear after clicking the submit button
    await waitFor(() => {
      screen.getByTestId('spinner');
    });

    // on successful submission, there should not be error messages or a spinner
    await waitFor(() => {
      expect(screen.queryByText(/there was an error/i)).not.toBeInTheDocument();
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });

    // on successful submission, the window should scroll to the top
    expect(window.scrollTo).toBeCalledTimes(1);
  });
  it('does not render if the form was submitted', () => {
    render(<ContactForm sent={true} setSent={() => null} />);
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });
});
