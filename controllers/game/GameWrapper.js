import Data from "./Data"
import PixiWrapper from "../../utils/scene/wrappers/pixi/PixiWrapper";
import GameController from "./GameController";

export default class GameWrapper extends PixiWrapper {

  storage = new Data();

  static get instance() {
    if (!this._instance) this._instance = new GameWrapper();

    return this._instance;
  }

  static _instance = null;

  initController() {
    const {eventBus, storage} = this;

    return new GameController({eventBus, storage});
  }
}
