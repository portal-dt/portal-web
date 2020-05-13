import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  email: {
    id: 'signInEmail',
    description: 'Email placeholder in Sign In Page',
    defaultMessage: 'Email',
  },
  password: {
    id: 'signInPassword',
    description: 'Password placeholder in Sign In Page',
    defaultMessage: 'Password',
  },
  submitButton: {
    id: 'singInButton',
    description: 'Button text in Sign in page',
    defaultMessage: 'Sign In',
  },
  continueToLogin: {
    id: 'continueToLogin',
    description: 'Button text in Sign in page',
    defaultMessage: 'Continue to login',
  },
  welcomeToPortal: {
    id: 'welcomeToPortal',
    description: 'Button text in Sign in page',
    defaultMessage: 'Welcome to dtPortal',
  },
  welcomeToDocuments: {
    id: 'welcomeToDocuments',
    description: 'Button text in Sign in page',
    defaultMessage: 'Welcome to your documents',
  },
  welcomeToLogin: {
    id: 'welcomeToLogin',
    description: 'Header text in otp',
    defaultMessage: 'Welcome to Login',
  },
  invalidPassword: {
    id: 'invalidPassword',
    description: 'Invalid password alert message',
    defaultMessage: 'Password Invalid or Expired!',
  },
  permissionsDenied: {
    id: 'permissionsDenied',
    description: 'Permissions denied alert message',
    defaultMessage: 'Permissions denied!',
  },
  otp: {
    id: 'otp',
    description: 'otp message',
    defaultMessage: 'Provide One Time Password (OTP) in the field below to complete Sign In',
  },
  yourEmail: {
    id: 'yourEmail',
    description: 'otp email address',
    defaultMessage: 'Your Email Address:',
  },
  authCode: {
    id: 'authCode',
    description: 'otp input text',
    defaultMessage: 'Authentication Code:',
  }
});
