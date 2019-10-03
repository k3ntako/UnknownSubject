import GameReducer from '../redux/reducers/GameReducer';
import store from '../redux/store';

const initialize = ( socket ) => {
  const updateOneCharCount = (characterId, count) => GameReducer.Methods.updateOneCharCount(store.dispatch)(characterId, count);

  socket.on('onChangeCount', (data) => updateOneCharCount(data.characterId, data.count));
}

export default initialize;
