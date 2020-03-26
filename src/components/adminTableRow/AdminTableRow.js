import React from 'react';
import PropTypes from 'prop-types';

import { GearFill, EyeFill, EyeSlashFill } from 'react-bootstrap-icons';

import Button from '../button/Button';

const AdminTableRow = ({ customerName, customerId, creationDate, contacts, status }) => (
  <tr>
    <td><input type="checkbox"/></td>
    <td>{customerName}</td>
    <td>{customerId}</td>
    <td>{creationDate}</td>
    <td>{contacts}</td>
    <td>{status ? <EyeFill/> : <EyeSlashFill/>}</td>
    <td> <Button text="Details" classNames={'btn btn-success'} /> </td>
    <td> <Button text="Manage" classNames={'btn btn-light'} /> </td>
    <td><Button text={<GearFill/>} classNames={'btn btn-light'}/> </td>
  </tr>
);

AdminTableRow.propTypes = {
  customerName: PropTypes.string.isRequired,
  customerId: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
  contacts: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
};

export default AdminTableRow;