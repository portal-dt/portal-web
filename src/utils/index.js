import {messages} from "../components/customerDashboard/messages";

export const formatDateToLocalString = (date) => new Date(date).toLocaleDateString('no-NO', { timeZone: 'UTC' });

const sortColumnNumber = (data, column, isAsc) => data.sort((a, b) => isAsc
  ? a[column] - b[column]
  : b[column] - a[column]);

const sortColumnStringAsc = (data, column) => data.sort((a, b) => a[column] > b[column] ? 1 : -1);
const sortColumnStringDesc = (data, column) => data.sort((a, b) => a[column] < b[column] ? 1 : -1);
const sortColumnString = (data, column, isAsc) => isAsc
  ? sortColumnStringAsc(data, column)
  : sortColumnStringDesc(data, column);

const sortColumnDate = (data, column, isAsc) => data.sort((a, b) => {
  const first = a[column] ? new Date(a[column]) : new Date();
  const second = b[column] ? new Date(b[column]) : new Date();
  return isAsc ? first - second : second - first;
});

export const sortColumn = (data, column, isAsc) => {
  switch (column) {
    case 'documentNumber':
      return sortColumnNumber(data, column, isAsc);
    case 'documentType':
    case 'customerName':
    case 'email':
      return sortColumnString(data, column, isAsc);
    case 'creationDate':
    case 'openedAt':
    case 'lastLogin':
      return sortColumnDate(data, column, isAsc);
  }
};

export const getDocumentName = (creationDate, documentType, formatMessage = {}, messages) => {
  const month = new Date(creationDate).toLocaleString('en', { month: 'long' }).toLowerCase();
  const year = new Date(creationDate).getUTCFullYear();
  return `${formatMessage(messages[documentType ? documentType : 'invoice'])} ${formatMessage(messages[month])} ${year}`;
};
