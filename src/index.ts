import { Application } from 'pixi.js';
import Config from './config';
import GameField from './model/GameField';
import GameFieldView from './view/GameFieldView';
import GameFieldController from './controller/GameFieldController';
import Player from './model/Player';
import PlayerStomperView from './view/PlayerStomperView';
import PlayersManager from './controller/PlayersManager';

const App: Application = new Application();

App.init({
    width: Config.width,
    height: Config.height,
    view: document.body.querySelector("#scene") as HTMLCanvasElement
});

let gf: GameField = new GameField();
let gfv: GameFieldView = new GameFieldView(gf);
let gfc: GameFieldController = new GameFieldController(gf, gfv);
App.stage.addChild(gfv);
gfc.start();

for (let i: number = 0; i < Config.players; i++)
{
    let player: Player = new Player(i, gf);
    let psv: PlayerStomperView = new PlayerStomperView(player);
    PlayersManager.managePlayerView(player, psv);
    gfv.addChild(psv);
}

PlayersManager.start();
