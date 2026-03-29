"use client";

import { useState, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ContactFormProps {
  dict: {
    contactForm: {
      title: string;
      subtitle: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      checkInLabel: string;
      checkOutLabel: string;
      guestsLabel: string;
      guest: string;
      guests: string;
      messageLabel: string;
      messagePlaceholder: string;
      required: string;
      sendMessage: string;
      sending: string;
      successTitle: string;
      successMessage: string;
      sendAnother: string;
      errorNameRequired: string;
      errorEmailRequired: string;
      errorEmailInvalid: string;
      errorMessageRequired: string;
      propertyInquiry: string;
    };
  };
  propertyTitle?: string;
}

export default function ContactForm({ dict, propertyTitle }: ContactFormProps) {
  const t = dict.contactForm;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    message: propertyTitle
      ? t.propertyInquiry.replace("{title}", propertyTitle)
      : "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t.errorNameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.errorEmailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.errorEmailInvalid;
    }

    if (!formData.message.trim()) {
      newErrors.message = t.errorMessageRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      checkIn: "",
      checkOut: "",
      guests: "2",
      message: "",
    });
  };

  if (isSuccess) {
    return (
      <div className="rounded-2xl bg-white p-8 sm:p-10 shadow-lg shadow-black/5 text-center">
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: "var(--color-whatsapp)", opacity: 0.15 }}
        >
          <svg
            className="h-8 w-8"
            style={{ color: "var(--color-whatsapp-dark)" }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {t.successTitle}
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
          {t.successMessage}
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg"
          style={{ backgroundColor: "var(--color-navy)" }}
        >
          {t.sendAnother}
        </button>
      </div>
    );
  }

  const inputBaseClasses =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/20";
  const errorInputClasses =
    "w-full rounded-xl border border-red-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 sm:p-8 lg:p-10 shadow-lg shadow-black/5"
      noValidate
    >
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {t.title}
        </h3>
        <p className="text-sm text-gray-500">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div className="sm:col-span-2">
          <label htmlFor="contact-name" className={labelClasses}>
            {t.nameLabel} <span className="text-red-500">{t.required}</span>
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t.namePlaceholder}
            className={errors.name ? errorInputClasses : inputBaseClasses}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-500" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className={labelClasses}>
            {t.emailLabel} <span className="text-red-500">{t.required}</span>
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t.emailPlaceholder}
            className={errors.email ? errorInputClasses : inputBaseClasses}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-500" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="contact-phone" className={labelClasses}>
            {t.phoneLabel}
          </label>
          <input
            type="tel"
            id="contact-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t.phonePlaceholder}
            className={inputBaseClasses}
          />
        </div>

        {/* Check-in */}
        <div>
          <label htmlFor="contact-checkin" className={labelClasses}>
            {t.checkInLabel}
          </label>
          <input
            type="date"
            id="contact-checkin"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            className={inputBaseClasses}
          />
        </div>

        {/* Check-out */}
        <div>
          <label htmlFor="contact-checkout" className={labelClasses}>
            {t.checkOutLabel}
          </label>
          <input
            type="date"
            id="contact-checkout"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            className={inputBaseClasses}
          />
        </div>

        {/* Number of Guests */}
        <div className="sm:col-span-2">
          <label htmlFor="contact-guests" className={labelClasses}>
            {t.guestsLabel}
          </label>
          <select
            id="contact-guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className={inputBaseClasses}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={String(num)}>
                {num} {num === 1 ? t.guest : t.guests}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className={labelClasses}>
            {t.messageLabel} <span className="text-red-500">{t.required}</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder={t.messagePlaceholder}
            className={errors.message ? errorInputClasses : inputBaseClasses}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-xs text-red-500" role="alert">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ backgroundColor: "var(--color-navy)" }}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {t.sending}
            </>
          ) : (
            <>
              {t.sendMessage}
              <svg
                className="ml-2 h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m22 2-7 20-4-9-9-4 20-7z" />
                <path d="M22 2 11 13" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
