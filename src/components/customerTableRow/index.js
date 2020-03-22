import React from 'react';
import PropTypes from 'prop-types';

import Button from '../button';

const CustomerTableRow = ({ documentName, documentId, creationDate }) => (
  <tr>
    <td style={{fontWeight: "bold"}}>{documentName}</td>
    <td>{documentId}</td>
    <td>{creationDate}</td>
    <td> <Button text={'View'} classNames={'btn-success-custom'} /> </td>
  </tr>
);

CustomerTableRow.propTypes = {
  documentName: PropTypes.string.isRequired,
  documentId: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired
};

export default CustomerTableRow;