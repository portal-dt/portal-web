import React from 'react';
import BootstrapCard from 'react-bootstrap/Card';

import './Card.less';

const Card = ({ cardHeaderText, children, classNames}) => (
  <BootstrapCard className={classNames} >
    <BootstrapCard.Header>{cardHeaderText}</BootstrapCard.Header>
    <BootstrapCard.Body>
      {children}
    </BootstrapCard.Body>
  </BootstrapCard>
);

export default Card;
