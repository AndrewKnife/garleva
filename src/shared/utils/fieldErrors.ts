import { FieldError, ViolationErrorMap } from '@/shared/interfaces/api';
import { TranslationKeyType } from '@/shared/composables/useTranslations';

export const toErrorsObject = (errorArray?: FieldError[]): ViolationErrorMap => {
  return (errorArray ?? []).reduce((obj, error) => {
    return {
      ...obj,
      [error.propertyPath]: error,
    };
  }, {});
};

export const ERROR_MAP: Record<string, { description: string; translation: TranslationKeyType }> = {
  'c1051bb4-d103-4f74-8988-acbcafc7fdc3': {
    description: 'IS_BLANK',
    translation: 'validation_is_blank',
  },
  '9ff3fdc4-b214-49db-8718-39c315e33d45': {
    description: 'TOO_SHORT',
    translation: 'validation_too_short',
  },
  'd94b19cc-114f-4f44-9cc4-4138e80a87b9': {
    description: 'TOO_LONG',
    translation: 'validation_too_long',
  },
  '35e6a710-aa2e-4719-b58e-24b35749b767': {
    description: 'INVALID_CHARACTERS',
    translation: 'validation_invalid_characters',
  },
  'de1e3db3-5ed4-4941-aae4-59f3667cc3a3': {
    description: 'REGEX_FAILED',
    translation: 'validation_regex_failed',
  },
  'bd79c0ab-ddba-46cc-a703-a7a4b08de310': {
    description: 'INVALID_EMAIL_FORMAT',
    translation: 'validation_invalid_email_format',
  },
  'bd79c0ab-ddba-46cc-a703-a7a4b08cu000': {
    description: 'EMAIL_TAKEN',
    translation: 'validation_email_taken',
  },
  'email-1': {
    description: 'EMAIL_TAKEN',
    translation: 'validation_email_taken',
  },
  '8e179f1b-97aa-4560-a02f-2a8b42e49df7': {
    description: 'NO_SUCH_CHOICE',
    translation: 'validation_no_such_choice',
  },
  '2beabf1c-54c0-4882-a928-05249b26e23b': {
    description: 'NOT_TRUE',
    translation: 'validation_not_true',
  },
  '8f900c12-61bd-455d-9398-996cd040f7f0': {
    description: 'INVALID_COUNTRY',
    translation: 'validation_invalid_country',
  },
  '0003': {
    description: 'TAX_ID_UNIQUE',
    translation: 'validation_tax_id_unique',
  },
};

export const ERROR_FIELD_MAP: Record<string, TranslationKeyType> = {
  'billingAddress.country': 'registration_b2b_country_label',
  'deliveryAddress.country': 'registration_b2b_country_label',
  deliveryAddress: 'delivery_card_label',
  deliveryContact: 'billing_modal_employee_label',
  'billingContact.email': 'billing_modal_email_label',
  'deliveryContact.email': 'delivery_modal_email_label',
};

export const getErrorTranslation = (error?: FieldError): string =>
  error ? ERROR_MAP[error?.code]?.translation ?? 'validation_generic_error' : '';
