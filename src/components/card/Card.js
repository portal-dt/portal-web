import React from 'react';
import BootstrapCard from 'react-bootstrap/Card';

import './Card.less';

const Card = ({ cardHeaderText, cardText }) => (
  <BootstrapCard className="text-center dashboard-card" >
    <BootstrapCard.Header>{cardHeaderText}</BootstrapCard.Header>
    <BootstrapCard.Body>
      <BootstrapCard.Text>
        {cardText}
      </BootstrapCard.Text>
    </BootstrapCard.Body>
  </BootstrapCard>
);

export default Card;
