import { createSelector } from 'reselect'

export const isAuthenticatedSelector = createSelector(
  state => state.user.isAuthenticated,
  isAuthenticated => isAuthenticated || localStorage.getItem('token')
);

export const languageSelector = createSelector(
  state => state.user.user.language,
  (language) => language || navigator.languages[0].split('-')[0]
);

export const userSelector = createSelector(
  state => state.user.user,
  user => user || {}
);

export const isAdminSelector = createSelector(
  state => state.user.user.isAdmin,
  isAdmin => isAdmin || window.location.hostname === 'dtportal-kraft.doctricks.net'
);

export const isLoadingSelector = createSelector(
  state => state.configs.isLoading,
  isLoading => isLoading
);

export const customersSelector = createSelector(
  state => state.customers.customers,
  customers => customers
);