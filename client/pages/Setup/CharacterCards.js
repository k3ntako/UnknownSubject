import React from 'react';
import CharacterCard from './CharacterCard';

import { CHARACTER_LIST } from './CharacterList';
import styles from './index.css';

export default (props) => {
  const { charList, onPlus, onMinus } = props;

  const cards = CHARACTER_LIST.citizens.map(character => {
    return <CharacterCard
      key={character.id}
      className={styles.card}
      character={character}
      count={charList[character.id]}
      onPlus={onPlus}
      onMinus={onMinus} />
  });

  return <div className={styles.cards}>
    { cards }
  </div>
}
