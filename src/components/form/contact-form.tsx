import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// components
import { Input, Spinner, PrimaryButton } from '@/components';

// types
export type FormDataType = {
  'your-name': string;
  'your-email': string;
  'your-subject': string;
  'your-message': string;
};

export type FieldName = keyof FormDataType;

// default form data
const defaultValues: FormDataType = {
  'your-name': '',
  'your-email': '',
  'your-subject': '',
  'your-message': '',
};

// contact form api endpoint
export const ENDPOINT =
  'https://www.admin.jonrutter.io/wp-json/contact-form-7/v1/contact-forms/7/feedback';

type Props = {
  sent: boolean;
  setSent: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ContactForm: React.FC<Props> = ({ sent, setSent }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const tabIndex = loading || sent ? -1 : 0;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data: FormDataType) => {
    if (loading || sent) return;
    setLoading(true);

    let formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    fetch(ENDPOINT, { method: 'POST', body: formData })
      .then((response) => {
        if (response.status !== 200)
          throw new Error(`Response status ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (data.status === 'validation_failed')
          throw new Error('Form validation failed');
        setSent(true);
        setError('');
        if (window?.scrollTo) {
          window.scrollTo(0, 0);
        }
      })
      .catch((err) => {
        setError(
          'Sorry! There was an error sending your message. Please try again.'
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (sent) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      name="contact"
      className="w-full mx-auto relative text-left text-lg"
      data-testid="contact-form"
    >
      <div className="w-full grid grid-cols-1 gap-y-8 gap-x-4 mb-8 sm:grid-cols-2">
        <div className="col-span-1">
          <Input
            name="your-name"
            label="Name"
            register={register}
            error={errors['your-name']}
            required
            tabIndex={tabIndex}
          />
        </div>
        <div className="col-span-1">
          <Input
            name="your-email"
            label="Email"
            register={register}
            error={errors['your-email']}
            required
            tabIndex={tabIndex}
          />
        </div>
        <div className="col-span-full">
          <Input
            name="your-subject"
            label="Subject"
            register={register}
            error={errors['your-subject']}
            required
            tabIndex={tabIndex}
          />
        </div>
        <div className="col-span-full">
          <Input
            as="textarea"
            name="your-message"
            label="Message"
            register={register}
            error={errors['your-message']}
            required
            tabIndex={tabIndex}
          />
        </div>
      </div>
      <div className="flex justify-center items-center">
        {loading ? (
          <Spinner />
        ) : (
          <PrimaryButton as="button" type="submit" tabIndex={tabIndex}>
            Send
          </PrimaryButton>
        )}
      </div>
      {/* form error message */}
      {error && (
        <div className="mt-8">
          <h2 className="text-2xl text-center mb-2">Oops!</h2>
          <p className="mb-4">
            There was an error, and your message wasn't sent. Sorry about that!
            Please try again.
          </p>
        </div>
      )}
    </form>
  );
};
