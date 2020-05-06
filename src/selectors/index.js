import { createSelector } from 'reselect'

export const isAuthenticatedSelector = createSelector(
  state => state.user.isAuthenticated,
  isAuthenticated => isAuthenticated || localStorage.getItem('token')
);

export const languageSelector = createSelector(
  state => state.user.user.language,
  (language) => language
);

export const userNameSelector = createSelector(
  state => state.user.user.firstName,
  state => state.user.user.lastName,
  (firstName, lastName) => `${firstName} ${lastName}`
);

export const userSelector = createSelector(
  state => state.user.user,
  user => user || {}
);

export const isLoadingSelector = createSelector(
  state => state.configs.isLoading,
  isLoading => isLoading
);

export const customersSelector = createSelector(
  state => state.customers.customers,
  customers => customers
);