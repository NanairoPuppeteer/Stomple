import { EventEmitter } from "pixi.js";
import Marble from "../model/Marble";
import MarbleView from "../view/MarbleView";

class MarbleController extends EventEmitter
{
    private marble: Marble;
    private view: MarbleView;

    constructor(marble: Marble, view: MarbleView)
    {
        super();
        
        this.marble = marble;
        this.view = view;

        this.view.on('pointerup', this.onClick, this);
    }

    public update()
    {
        this.view.update();
    }

    private onClick()
    {
        this.emit('DropMarble', this.marble);
        this.view.update();
    }
}

export default MarbleController;