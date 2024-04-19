import {useEffect} from 'react';
import {toNextState, useGameState} from '../../../../redux/reducer/game';
import {useDispatch} from 'react-redux';

export default function useStateReducer(wrapper) {
  const dispatch = useDispatch();
  const gameState = useGameState();

  useEffect(() => {
    if (!wrapper) return;

    const data = {state: gameState, promise: null};
    wrapper.eventBus.dispatchEvent({type: 'apply-state', data});
    const {promise: stateLogicPromise} = data;

    if (stateLogicPromise) stateLogicPromise.then(() => dispatch(toNextState()));

  }, [wrapper, gameState]);
}
