import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Cards from '../Cards';

class Witness extends Component {
  constructor(props) {
    super(props);
    this.state={
      selectAssignedMax: props.myCharacter.action.select.selectAssigned || 0,
      selectUnassignedMax: props.myCharacter.action.select.selectUnassigned || 0,
      assignedSelected: [],
      unassignedSelected: [],
    }
  }

  onCardClick = (cardType, id) => { //id can be card id (unassigned cards) or userId (assigned cards)
    const { selectAssignedMax, selectUnassignedMax } = this.state;
    const selectMaxNum = cardType === "assigned" ? selectAssignedMax : selectUnassignedMax;
    if (!selectMaxNum) { 
      return;
    }

    const key = cardType + "Selected";
    const otherKey = cardType === "assigned" ? "unassignedSelected" : "assignedSelected";
    this.setState((prevState) => {
      // unselect card
      if (prevState[key].includes(id)) {
        return { [key]: prevState[key].filter(selectedId => selectedId !== id) };
      }

      // select card
      if (this.state[key].length < selectMaxNum) {
        return {
          [key]: prevState[key].concat(id),
          [otherKey]: [],
        };
      }
    });
  }

  render() {
    const { assignedSelected, unassignedSelected, selectAssignedMax, selectUnassignedMax } = this.state;
    const nonOrderAffectingStage = this.props.stages.find(stage => stage.includes("=nonOrderAffecting"));
    const nonOrderAffectingIdx = nonOrderAffectingStage.split("=")[0];
    
    const stageAfterNonOrderAffecting = this.props.stages[Number(nonOrderAffectingIdx) + 1];

    return <Cards
      assignedSelected={assignedSelected}
      unassignedSelected={unassignedSelected}
      selectAssignedMax={selectAssignedMax}
      selectUnassignedMax={selectUnassignedMax}
      users={this.props.users}
      unassignedRoles={this.props.unassignedRoles}
      onCardClick={this.onCardClick}
      onDone={this.props.onDone} 
      revealSelected={this.props.currentStage === stageAfterNonOrderAffecting}/>
  }
}

const mapStateToProps = function (state) {
  return {
    currentStage: state.room.currentStage,
    stages: state.room.stages,
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Witness)
);