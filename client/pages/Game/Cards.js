import React from 'react';

import Card from './Card';
import styles from './Card.css';

export default (props) => {
  return <>
    <div className={styles.cards}>
      { props.users.map(user => <Card
        key={user.id}
        id={user.id}
        text={user.name}
        selected={props.selected}
        onCardClick={props.onCardClick} /> )}
    </div>
    <div className={styles.cards}>
      { props.unassignedRoles.map(role => <Card
        key={role.id}
        id={role.id}
        text={role.role}
        selected={props.selected}
        onCardClick={props.onCardClick} /> )}
    </div>
  </>
}
