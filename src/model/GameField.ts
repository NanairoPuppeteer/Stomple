import Marble from "./Marble";
import Config from "../config";

class GameField
{
    private marbles: Array<Array<Marble>>;

    constructor()
    {
        this.marbles = [];
    }

    public fillField()
    {
        let marblesSet: Array<number> = [];

        for (let i: number = 0; i < Config.lines*Config.columns; i++)
        {
            marblesSet.push(i%Config.colors.length);
        }
        
        this.marbles = [];
        for (let i: number = 0; i < Config.lines; i++)
        {
            let line: Array<Marble> = [];
            for (let j: number = 0; j < Config.columns; j++)
            {
                let colorId: number = marblesSet.splice(Math.floor(Math.random()*marblesSet.length), 1)[0];
                let marble: Marble = new Marble(colorId, i, j);
                line.push(marble);
            }
            this.marbles.push(line);
        }
    }

    public getMarble(line: number, column: number): Marble|null
    {
        if (
            line < 0 || line >= this.marbles.length
            || column < 0 || column > this.marbles[line].length
        )
        {
            return null;
        }
        return this.marbles[line][column];
    }
}

export default GameField;