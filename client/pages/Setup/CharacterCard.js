import React, { Component } from 'react';
import styles from './index.css';

export default class CharacterCard extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  onPlus = () => {
    const { character, onPlus } = this.props;
    onPlus(character.id);
  }

  onMinus = () => {
    const { character, onMinus, count } = this.props;
    count > 0 && onMinus(character.id);
  }

  render(){
    const minusDisabled = this.props.count <= 0;
    const disabledClassName = minusDisabled ? styles.disabled : "";

    const character = this.props.character;
    return <div className={styles.card}>
      <div className={styles.count}>
        { this.props.count }
      </div>
      <div className={styles.name}>
        { character.roleName }
      </div>
      <div>
        <div className={styles.plusButton} onClick={this.onPlus}>
          <i className="fas fa-plus"></i>
        </div>
        <div
          className={`${styles.minusButton} ${disabledClassName}`} onClick={this.onMinus}>
          <i className="fas fa-minus"></i>
        </div>
      </div>
    </div>
  }
}
