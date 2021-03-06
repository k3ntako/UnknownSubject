import React from 'react';
import Button from '../../components/Button';

import Card from './Card';
import styles from './Card.css';

export default (props) => {
  const { unassignedRoles, users, assignedSelected, unassignedSelected, selectAssignedMax, selectUnassignedMax, onCardClick, onDone } = props;
  const buttonDisabled = !(assignedSelected.length === selectAssignedMax || unassignedSelected.length === selectUnassignedMax);

  if ( !selectAssignedMax && !selectUnassignedMax ){
    return null;
  }

  return <>
    <h3 className={styles.cardsTitle}>Players' Cards</h3>
    <div className={styles.cards}>
      { users.map(user => <Card
        key={user.id}
        id={user.id}
        text={user.name}
        selected={assignedSelected}
        isSelecting={!!selectAssignedMax}
        onCardClick={onCardClick.bind(null, "assigned")} /> )}
    </div>
    <h3 className={styles.cardsTitle}>Unassigned Cards</h3>
    <div className={styles.cards}>
      { unassignedRoles.map(role => <Card
        key={role.id}
        id={role.id}
        text={role.role}
        selected={unassignedSelected}
        isSelecting={!!selectUnassignedMax}
        onCardClick={onCardClick.bind(null, "unassigned")} /> )}
    </div>
    <Button disabled={buttonDisabled} onClick={onDone}>Done!</Button>
  </>
}
