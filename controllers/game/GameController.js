import PixiController from '../../utils/scene/containers/PixiController';
import TextureLoader from '../../utils/scene/loader/plugins/pixi/TextureLoader';

export default class GameController extends PixiController {

  loader

  constructor(data) {
    super(data);
  }

  async loadingAssetsSelect() {
    const textures = this.storage?._data?.assetsSettings?.textures

    if (!textures) return

    console.log(PIXI);

    this.loader = new TextureLoader()

    textures.forEach(async texture => await this.loader.load(texture))

    console.log(this.loader);
  }

  init() {
    super.init();
  }
}
