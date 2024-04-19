import {useRef, useState} from 'react';
import {useLoadController} from '../utils/scene/react/hooks/useLoadController';
import {basePixiImports} from '../utils/scene/utils/import/import-pixi';
import useStateReducer from '../utils/scene/react/hooks/useStateReducer';

const Game = () => {

  const wrapperRef = useRef();
  const [wrapper, setWrapper] = useState();

  useLoadController({
    getLibsPromise: basePixiImports,
    getWrapperPromise: () => import(`/controllers/game/GameWrapper`),
    beforeInit: ({wrapper}) => setWrapper(wrapper),
  });

  useStateReducer(wrapper);

  return (
    <div ref={wrapperRef} className={'scene__wrapper'}></div>
  );
};

export default Game;
