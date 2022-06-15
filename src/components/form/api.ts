import type { FormDataType } from './contact-form';

// contact form api endpoint
export const ENDPOINT =
  'https://www.admin.jonrutter.io/wp-json/contact-form-7/v1/contact-forms/7/feedback';

export const sendData = (data: FormDataType) => {
  // encode formData for submission to the back-end
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    for (const field in data) {
      formData.append(field, data[field as keyof FormDataType]);
    }

    fetch(ENDPOINT, { method: 'POST', body: formData })
      .then((response) => {
        // check for HTTP response errors
        if (response.status !== 200) throw new Error();
        return response.json();
      })
      .then((data) => {
        // check for errors in the back-end
        if (data.status === 'validation_failed') reject();
        // if no errors, resolve true
        resolve(true);
      })
      .catch(() => reject());
  });
};
