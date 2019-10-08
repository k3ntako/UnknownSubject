import React from 'react';
import CharacterCard from './CharacterCard';

import { CHARACTER_LIST } from '../../models/CharacterList';
import styles from './index.css';

export default (props) => {
  const { characterList, onPlus, onMinus } = props;

  const cards = CHARACTER_LIST.map(character => {
    return <CharacterCard
      key={character.id}
      className={styles.card}
      character={character}
      count={characterList[character.id]}
      onPlus={onPlus}
      onMinus={onMinus} />
  });

  return <div className={styles.cards}>
    { cards }
  </div>
}
