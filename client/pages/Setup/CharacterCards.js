import React from 'react';
import CharacterCard from './CharacterCard';

import { CHARACTER_IDS, CHARACTER_LIST } from '../../models/CharacterList';
import styles from './index.css';

export default (props) => {
  const { characterList, onPlus, onMinus } = props;

  const cards = CHARACTER_IDS.map(key => {
    const character = CHARACTER_LIST[key];
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
