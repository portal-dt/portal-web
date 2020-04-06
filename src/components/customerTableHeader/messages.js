import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  columnDocumentName: {
    id: 'tableColumnDocumentNumber',
    description: 'Documents column number text',
    defaultMessage: 'Document Number',
  },
  columnDocumentType: {
    id: 'tableColumnDocumentType',
    description: 'Documents table column text',
    defaultMessage: 'Document Type',
  },
  columnLastOpened: {
    id: 'tableColumnLastOpened',
    description: 'Documents table column text',
    defaultMessage: 'Last Opened',
  },
  columnCreationDate: {
    id: 'tableColumnCreationDate',
    description: 'Documents table column text',
    defaultMessage: 'Creation Date',
  },
  filterLastRead: {
    id: 'filterByLastOpened',
    description: 'Documents filter placeholder',
    defaultMessage: 'Filter by Last Opened',
  }
});
