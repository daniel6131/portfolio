import { useState, useCallback } from 'react';
import emailjs from '@emailjs/browser';

import Alert from '../components/Alert';
import { Particles } from '../components/Particles';
import { useAlert } from '../hooks/useAlert';

const { VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY } = import.meta
  .env;

const INITIAL_FORM_STATE = {
  name: '',
  email: '',
  message: '',
};

const Contact = () => {
  const { alert, showAlert } = useAlert();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback(e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      setIsLoading(true);

      try {
        await emailjs.send(
          VITE_EMAILJS_SERVICE_ID,
          VITE_EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            to_name: 'Daniel',
            from_email: formData.email,
            to_email: 'obiware.dev@gmail.com',
            message: formData.message,
          },
          VITE_EMAILJS_PUBLIC_KEY
        );

        setFormData(INITIAL_FORM_STATE);
        showAlert({ text: 'Your message has been sent!', type: 'success' });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('EmailJS Error:', error);
        showAlert({ text: 'Something went wrong. Please try again.', type: 'danger' });
      } finally {
        setIsLoading(false);
      }
    },
    [formData, showAlert]
  );

  return (
    <section id='contact' className='c-space section-spacing relative flex items-center'>
      <Particles
        className='absolute inset-0 -z-50'
        quantity={100}
        ease={80}
        color={'#ffffff'}
        refresh
      />

      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <div className='container mx-auto max-w-7xl'>
        <div className='bg-primary mx-auto flex max-w-md flex-col items-center justify-center rounded-2xl border border-white/10 p-5'>
          <div className='mb-10 flex w-full flex-col items-start gap-5'>
            <h2 className='text-heading'>Let's Talk</h2>
            <p className='font-normal text-neutral-400'>
              Whether you're looking to build a new website, improve your existing platform, or
              bring a unique project to life, I'm here to help
            </p>
          </div>

          <form className='w-full' onSubmit={handleSubmit}>
            <div className='mb-5'>
              <label htmlFor='name' className='feild-label'>
                Full Name
              </label>
              <input
                id='name'
                name='name'
                type='text'
                className='field-input field-input-focus'
                placeholder='John Doe'
                autoComplete='name'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className='mb-5'>
              <label htmlFor='email' className='feild-label'>
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                className='field-input field-input-focus'
                placeholder='JohnDoe@email.com'
                autoComplete='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className='mb-5'>
              <label htmlFor='message' className='feild-label'>
                Message
              </label>
              <textarea
                id='message'
                name='message'
                rows='4'
                className='field-input field-input-focus'
                placeholder='Share your thoughts...'
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type='submit'
              disabled={isLoading}
              className='from-lavender to-royal hover-animation w-full cursor-pointer rounded-md bg-radial px-1 py-3 text-center text-lg disabled:cursor-not-allowed disabled:opacity-70'
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
