import Player from "../model/Player";
import PlayerController from "./PlayerController";
import PlayerStomperView from "../view/PlayerStomperView";
import MarblesManager from "./MarblesManager";
import Marble from "../model/Marble";
import Config from "../config";

class PlayersManager
{
    private static controllers: Array<PlayerController> = [];
    private static currentPlayerId: number = 0;
    private static activePlayers: number = Config.players;

    public static managePlayerView(player: Player, view: PlayerStomperView)
    {
        let controller: PlayerController = new PlayerController(player, view);
        controller.on('UpdateTargets', this.onUpdateTargets, this);
        controller.on('EndTurn', this.onEndTurn, this);
        controller.on('EndGame', this.onEndGame, this);

        PlayersManager.controllers.push(controller);
    }

    private static onUpdateTargets()
    {
        MarblesManager.updateAll();
    }

    private static onEndTurn()
    {
        PlayersManager.currentPlayerId = (PlayersManager.currentPlayerId + 1) % PlayersManager.controllers.length;
        PlayersManager.start();
    }

    private static onEndGame()
    {
        PlayersManager.activePlayers--;
        if (PlayersManager.activePlayers <= 1)
        {
            // TODO: Объявить победителя
            return;
        }
        PlayersManager.onEndTurn();
    }

    public static start()
    {
        if (PlayersManager.currentPlayerId < PlayersManager.controllers.length)
        {
            PlayersManager.controllers[PlayersManager.currentPlayerId].startTurn();
        }
    }

    public static removeControllers()
    {
        PlayersManager.controllers = [];
    }

    public static moveCurrentPlayer(marble: Marble)
    {
        if (PlayersManager.currentPlayerId < PlayersManager.controllers.length)
        {
            PlayersManager.controllers[PlayersManager.currentPlayerId].move(marble);
        }
    }
}

export default PlayersManager