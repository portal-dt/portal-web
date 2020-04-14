import { createSelector } from 'reselect'

export const isAuthenticatedSelector = createSelector(
  state => state.user.isAuthenticated,
  isAuthenticated => isAuthenticated
);

export const languageSelector = createSelector(
  state => state.user.user.locale,
  state => state.configs.language,
  (language, configsLanguage) => language || configsLanguage
);

export const userNameSelector = createSelector(
  state => state.user.user.firstName,
  state => state.user.user.lastName,
  (firstName, lastName) => `${firstName} ${lastName}`
);
