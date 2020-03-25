import React from 'react';
import PropTypes from 'prop-types';

import Button from '../button';

const CustomerTableRow = ({ documentName, documentType, creationDate, openedStatus }) => (
  <tr>
    <td>{documentName}</td>
    <td>{documentType}</td>
    <td>{creationDate}</td>
    <td>{openedStatus ? openedStatus: 'Unread'}</td>
    <td> <Button text={'View'} /> </td>
  </tr>
);

CustomerTableRow.propTypes = {
  documentName: PropTypes.string.isRequired,
  documentId: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired
};

export default CustomerTableRow;