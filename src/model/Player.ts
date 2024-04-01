import { EventEmitter } from "pixi.js";
import Config from "../config";
import GameField from "./GameField";
import Marble from "./Marble";

class Player extends EventEmitter
{
    private gameField: GameField;

    public defaultColorId: number;
    public targetColorId: number;

    public started: boolean;
    public ended: boolean;
    private moving: boolean;

    public line: number;
    public column: number;

    private hasTargets: boolean;

    constructor(colorId: number, gameField: GameField)
    {
        super();

        this.gameField = gameField;

        this.defaultColorId = this.targetColorId = colorId;

        this.started = false;
        this.ended = false;
        this.moving = false;

        this.line = 0;
        this.column = 0;

        this.hasTargets = false;
    }

    public startTurn()
    {
        this.findTargets();
        if (!this.hasTargets)
        {
            this.ended = true;
            this.emit('EndGame');
        }
    }
    
    private checkTarget(marble: Marble)
    {
        if (!this.started)
        {
            return (marble.line == 0 || marble.line == Config.lines - 1
                || marble.column == 0 || marble.column == Config.columns - 1);
        }

        if (!this.moving)
        {
            return marble.colorId == this.defaultColorId
                || (Math.abs(this.line - marble.line) <= 1 && Math.abs(this.column - marble.column) <= 1);
        }

        return marble.colorId == this.targetColorId
            && (Math.abs(this.line - marble.line) <= 1 && Math.abs(this.column - marble.column) <= 1);
    }
    
    private findTargets()
    {
        if (this.ended)
        {
            this.hasTargets = false;
            return;
        }
        let targetsNum: number = 0;
        
        for (let i: number = 0; i < Config.lines; i++)
        {
            for (let j: number = 0; j < Config.columns; j++)
            {
                let marble: Marble|null = this.gameField.getMarble(i, j);
                if (marble != null)
                {
                    marble.targetable = this.checkTarget(marble);
                    if (marble.targetable)
                    {
                        targetsNum++;
                    }
                }
            }
        }
        
        this.hasTargets = (targetsNum > 0);
        this.emit('UpdateTargets');
    }

    public move(marble: Marble)
    {
        this.line = marble.line;
        this.column = marble.column;
        marble.drop();
        this.started = true;
        
        if (!this.moving)
        {
           this.moving = true;
           this.targetColorId = marble.colorId;
        }
        this.emit('PlayerMovement');

        this.advanceTurn();
    }
    
    private advanceTurn()
    {
        this.findTargets();
        if (!this.hasTargets)
        {
            this.moving = false;
            this.endTurn();
        }
    }

    private endTurn()
    {
        this.emit('EndTurn');
    }
}

export default Player;