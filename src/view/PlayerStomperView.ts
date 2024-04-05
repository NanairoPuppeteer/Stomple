import { Container, Graphics } from "pixi.js";
import Config from "../config";
import Player from "../model/Player";

// TODO: Добавить анимацию

class PlayerStomperView extends Container
{
    private player: Player;

    private gr: Graphics;

    private defaultX: number;
    private defaultY: number;

    constructor(player: Player)
    {
        super();

        this.player = player;

        if (this.player.defaultColorId%2 == 0)
        {
            if (this.player.defaultColorId == Config.players - 1)
            {
                this.defaultX = Config.width - 112
            }
            else
            {
                this.defaultX = Config.width - 150;
            }
        }
        else
        {
            this.defaultX = Config.width - 75;
        }

        this.defaultY = 20 + (Math.ceil((this.player.defaultColorId + 1)/2) - 1)*75;

        this.gr = new Graphics;
        this.gr.rect(5, 25, 60, 20).fill({color: "white"});
        this.gr.rect(25, 5, 20, 60).fill({color: "white"});
        this.gr.circle(35, 35, 25).fill({color: Config.colors[this.player.defaultColorId], alpha: 0.5});
        this.gr.circle(35, 35, 20).fill({color: Config.colors[this.player.defaultColorId], alpha: 1});
        this.gr.circle(40, 26, 10).fill({color: "white", alpha: 0.5});
        this.gr.circle(43, 23, 5).fill({color: "white", alpha: 1});

        this.addChild(this.gr);
        this.position.set(this.defaultX, this.defaultY);
    }

    public update()
    {
        if (this.player.started && !this.player.ended)
        {
            this.position.set(11 + this.player.column*70, 11 + this.player.line*70);
        }
        else
        {
            this.position.set(this.defaultX, this.defaultY);
        }
    }
}

export default PlayerStomperView;