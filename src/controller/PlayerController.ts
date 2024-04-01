import { EventEmitter } from "pixi.js";
import Player from "../model/Player";
import Marble from "../model/Marble";
import PlayerStomperView from "../view/PlayerStomperView";

class PlayerController extends EventEmitter
{
    private player: Player;
    private view: PlayerStomperView;

    constructor(player: Player, view: PlayerStomperView)
    {
        super();
        
        this.player = player;
        this.view = view;

        this.player.on('PlayerMovement', this.onMove, this);
        this.player.on('UpdateTargets', this.onUpdateTargets, this);
        this.player.on('EndTurn', this.onEndTurn, this);
        this.player.on('EndGame', this.onEndGame, this);
    }

    public startTurn()
    {
        if (!this.player.ended)
        {
            this.player.startTurn();
        }
        else
        {
            this.emit('EndTurn');
        }
    }

    public move(marble: Marble)
    {
        this.player.move(marble);
    }

    private onMove()
    {
        this.view.update();
    }

    private onUpdateTargets()
    {
        this.emit('UpdateTargets');
    }

    private onEndTurn()
    {
        this.emit('EndTurn');
    }

    private onEndGame()
    {
        this.view.update();
        this.emit('EndGame');
    }
}

export default PlayerController;