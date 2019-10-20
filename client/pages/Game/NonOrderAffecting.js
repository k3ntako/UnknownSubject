import React from 'react';
import styles from './index.css';

export default (myRole, roles, myId) => {
  // if user is witness
  if (myRole === "witness") {
    const message = <span>Select <span className={styles.bold}>2 unassigned cards</span> or <span className={styles.bold}>1 card of another player</span> that you'd want to peek at.</span>;
    return message;
  }

  // if user is murderer, twin, or lawyer
  let roleText = "other " + myRole;
  let users = [];

  if (myRole === "murderer" || myRole === "twin") {
    users = roles[myRole].filter(user => user.id !== myId); //same role as user
  } else if (myRole === "lawyer") {
    roleText = "murderer"
    users = roles.murderer;
  }
  
  if (!users.length) {
    const message = `There is no ${roleText}.`;
    return message;
  }

  const names = users.map(user => user.name).join(", ");

  const isPlural = users.length !== 1;
  roleText += isPlural ? "s are" : " is";

  const message = `The ${roleText} ${names}`;
  return message;
}