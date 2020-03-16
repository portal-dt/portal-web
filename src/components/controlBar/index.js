import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Dash, Plus, EyeFill, EyeSlashFill } from 'react-bootstrap-icons';

import ControlBarAction from '../controlBarAction';

const actionIconSrc = '../../../assets/icons/enable-user.png';

const ControlBar = () => (
  <Row>
    <ControlBarAction actionText={'Create'} actionIconSrc={<Plus />} />
    <ControlBarAction actionText={'Delete'} actionIconSrc={<Dash/>} />
    <ControlBarAction actionText={'Enable'} actionIconSrc={<EyeFill/>} />
    <ControlBarAction actionText={'Disable'} actionIconSrc={<EyeSlashFill/>} />
    <Col xs="4" className="align-self-end">
      <Row className>
        <Col xs>
          <input type="text" placeholder="Search..." />
        </Col>
      </Row>
    </Col>
  </Row>
);

export default ControlBar;