import { EventEmitter } from "pixi.js";
import Marble from "../model/Marble";
import MarbleView from "../view/MarbleView";
import MarbleController from "./MarbleController";
import PlayersManager from "./PlayersManager";

class MarblesManager
{
    private static controllers: Array<MarbleController> = [];

    public static events: EventEmitter = new EventEmitter();
    
    public static manageMarbleView(marble: Marble, view: MarbleView)
    {
        let controller = new MarbleController(marble, view);
        controller.on('DropMarble', MarblesManager.onDrop, this);

        MarblesManager.controllers.push(controller);
    }

    private static onDrop(eventMarble: Marble)
    {
        PlayersManager.moveCurrentPlayer(eventMarble);
    }

    public static removeControllers()
    {
        MarblesManager.controllers = [];
    }

    public static updateAll()
    {
        for (let i: number = 0; i < MarblesManager.controllers.length; i++)
        {
            MarblesManager.controllers[i].update();
        }
    }
}


export default MarblesManager;