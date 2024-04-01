import { Container, Graphics } from "pixi.js";
import MarblesManager from "../controller/MarblesManager";
import GameField from "../model/GameField";
import MarbleView from "./MarbleView";
import Config from "../config";
import Marble from "../model/Marble";

class GameFieldView extends Container
{
    private gameField: GameField;
    private bg: Graphics;

    private marbles: Array<Array<MarbleView>>

    constructor(gameField: GameField)
    {
        super();

        this.gameField = gameField;

        let marbleAreaWidth: number = 70*Config.columns;
        let marbleAreaHeight: number = 70*Config.lines;
        
        this.bg = new Graphics();
        this.bg.rect(9, 9, marbleAreaWidth+4, marbleAreaHeight+4).fill({color: "white"});
        this.bg.rect(11, 11, marbleAreaWidth, marbleAreaHeight).fill({color: "black"});
        for (let i: number = 0; i < Config.lines; i++)
        {
            for (let j: number = 0; j < Config.columns; j++)
            {
                this.bg.circle(46 + 70*j, 46 + 70*i, 5).fill({color: "white"});
            }
        }
        this.addChild(this.bg);

        this.marbles = [];
    }

    public updateMarbles()
    {
        this.removeMarbles();
        
        for (let i: number = 0; i < Config.lines; i++)
        {
            this.marbles.push([]);
            for (let j: number = 0; j < Config.columns; j++)
            {
                let marble: Marble|null = this.gameField.getMarble(i, j);
                if (marble != null && !marble.dropped)
                {
                    let mv: MarbleView = new MarbleView(marble);
                    MarblesManager.manageMarbleView(marble, mv);
                    this.marbles[i].push(mv);
                    this.addChild(mv);
                    mv.position.set(11+j*70, 11+i*70);
                }
            }
        }
    }

    private removeMarbles()
    {
        for (let i: number = 0; i < this.marbles.length; i++)
        {
            for (let j: number = 0; j < this.marbles[i].length; j++)
            {
                this.marbles[i][j].destroy();
            }
        }
    }
}

export default GameFieldView;