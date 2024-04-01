import GameField from "../model/GameField";
import GameFieldView from "../view/GameFieldView";

class GameFieldController
{
    private gameField: GameField;
    private view: GameFieldView;

    constructor(gameField: GameField, view: GameFieldView)
    {
        this.gameField = gameField;
        this.view = view;
    }

    public start()
    {
        this.gameField.fillField();
        this.view.updateMarbles();
    }
}

export default GameFieldController;