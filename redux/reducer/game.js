import Builder from '../../utils/redux/builder';

const SLICE_NAME = 'game';

export const LOAD_MANIFEST = 'loadManifest';
export const LOADING_ASSETS = 'loadingAssets';
export const LOADING_COMPLETE = 'loadingComplete';

const initialState = {
  activeState: LOAD_MANIFEST,
};

const builder = new Builder({
  name: SLICE_NAME,
  initialState,
  reducers: {
    toNextState: state => {
      state.activeState = getNextState(state.activeState)
    }
  }
})
.createSelector('game-state', state => {
  return state[SLICE_NAME].activeState;
});

const game = builder.create().export()

export const { useGameState } = game.selectors
export const { toNextState } = game.actions

export default game

const nextStateLogic = {
  [LOAD_MANIFEST]: LOADING_ASSETS,
  [LOADING_ASSETS]: LOADING_COMPLETE,
};

function getNextState(prevState) {
  return nextStateLogic[prevState]
}
