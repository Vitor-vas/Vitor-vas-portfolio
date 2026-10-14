import { useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import emailjs from '@emailjs/browser';

import { contactLinks } from '../data/social.ts';
import type { SendStatus } from '../types/Index.ts';
import '../styles/contact.css';

// Values come from the .env file (see .env.example). Vite only exposes variables prefixed with VITE_.
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

const MAX_MESSAGE = 1200;
const MIN_MESSAGE = 10;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
    </svg>
  );
}

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent);

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  // Honeypot: real users never see or fill this field, bots usually do.
  const [website, setWebsite] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SendStatus>('idle');

  function validate(): FormErrors {
    const next: FormErrors = {};

    if (!name.trim()) next.name = 'Please tell me your name.';

    if (!email.trim()) next.email = 'Please enter your email.';
    else if (!EMAIL_REGEX.test(email.trim())) next.email = 'This email looks invalid.';

    if (!message.trim()) next.message = 'Please write a message.';
    else if (message.trim().length < MIN_MESSAGE) {
      next.message = `Message must have at least ${MIN_MESSAGE} characters.`;
    }

    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus('idle');
      return;
    }

    // Bot detected: pretend it worked, send nothing.
    if (website) {
      setStatus('success');
      return;
    }

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS env vars are missing. Check your .env file.');
      setStatus('error');
      return;
    }

    setStatus('sending');

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim() || 'Portfolio contact',
          message: message.trim(),
        },
        { publicKey },
      );

      setStatus('success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setErrors({});
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  }

  // Cmd/Ctrl + Enter inside the textarea submits the form
  function handleMessageKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault();
      formRef.current?.requestSubmit();
    }
  }

  const sending = status === 'sending';

  return (
    <motion.section
      className="contact-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="contact-top">
        <span className="contact-tag">
          <i className="dot" /> DIRECT DISPATCH
        </span>

      </div>

      <h2 className="contact-title">Send a Message</h2>
      <p className="contact-sub">
        Fill out the brief form below. Transmissions go straight to my primary inbox.
      </p>

      <form ref={formRef} onSubmit={handleSubmit} noValidate className="contact-form">
        {/* ---------- Social links ---------- */}
        <div className="field">
          <span className="field-label" id="social-label">FIND ME ON</span>
          <nav className="social-group" aria-labelledby="social-label">
            {contactLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="social-link"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
              >
                {link.label} <span aria-hidden="true">↗</span>
              </motion.a>
            ))}
          </nav>
        </div>

        {/* ---------- Name + Email ---------- */}
        <div className="field-row">
          <div className="field">
            <label htmlFor="contact-name" className="field-label">
              NAME <b>*</b>
            </label>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Rivera"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              className={errors.name ? 'input invalid' : 'input'}
            />
            <FieldError id="contact-name-error" text={errors.name} />
          </div>

          <div className="field">
            <label htmlFor="contact-email" className="field-label">
              EMAIL <b>*</b>
            </label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@company.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              className={errors.email ? 'input invalid' : 'input'}
            />
            <FieldError id="contact-email-error" text={errors.email} />
          </div>
        </div>

        {/* ---------- Subject ---------- */}
        <div className="field">
          <label htmlFor="contact-subject" className="field-label">SUBJECT</label>
          <input
            id="contact-subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Engineering Opportunity"
            className="input"
          />
        </div>

        {/* ---------- Message ---------- */}
        <div className="field">
          <div className="field-label-row">
            <label htmlFor="contact-message" className="field-label">
              MESSAGE <b>*</b>
            </label>
            <span className="counter-mono">
              {message.length} / {MAX_MESSAGE}
            </span>
          </div>
          <textarea
            id="contact-message"
            rows={7}
            maxLength={MAX_MESSAGE}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleMessageKeyDown}
            placeholder="Your message..."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            className={errors.message ? 'input textarea invalid' : 'input textarea'}
          />
          <FieldError id="contact-message-error" text={errors.message} />
        </div>

        {/* Honeypot (hidden from people and screen readers) */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="honeypot"
        />

        {/* ---------- Footer: note + shortcut + button ---------- */}
        <div className="contact-actions">
          <span className="contact-note">
            <LockIcon /> Encrypted transit · Zero spam
          </span>

          <div className="contact-actions-right">
            <span className="shortcut">{isMac ? '⌘' : 'Ctrl'} + Enter</span>
            <motion.button
              type="submit"
              className="send-btn"
              disabled={sending}
              whileHover={sending ? undefined : { scale: 1.04 }}
              whileTap={sending ? undefined : { scale: 0.96 }}
            >
              {sending ? 'Sending...' : 'Send Message'} <SendIcon />
            </motion.button>
          </div>
        </div>

        {/* ---------- Result feedback ---------- */}
        <div role="status" aria-live="polite">
          <AnimatePresence mode="wait">
            {status === 'success' && (
              <motion.p
                key="success"
                className="feedback success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Message sent! I'll get back to you as soon as possible.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                key="error"
                className="feedback error"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Something went wrong. Please try again or email me directly.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </form>
    </motion.section>
  );
}

function FieldError({ id, text }: { id: string; text?: string }) {
  return (
    <AnimatePresence>
      {text && (
        <motion.p
          id={id}
          className="field-error"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {text}
        </motion.p>
      )}
    </AnimatePresence>
  );
}