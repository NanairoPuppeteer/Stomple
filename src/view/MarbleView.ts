import { Container, Graphics } from "pixi.js";
import Marble from "../model/Marble";
import Config from "../config";

class MarbleView extends Container
{
    private marble: Marble;
    private gr: Graphics;
    private grTarget: Graphics;
    
    constructor(marble: Marble)
    {
        super();

        this.marble = marble;

        this.grTarget = new Graphics();
        this.grTarget.circle(35, 35, 30).fill({color: "white", alpha: 1});
        this.grTarget.visible = false;
        
        this.gr = new Graphics();
        this.gr.circle(35, 35, 25).fill({color: Config.colors[this.marble.colorId], alpha: 0.5});
        this.gr.circle(35, 35, 20).fill({color: Config.colors[this.marble.colorId], alpha: 1});
        this.gr.circle(40, 26, 10).fill({color: "white", alpha: 0.5});
        this.gr.circle(43, 23, 5).fill({color: "white", alpha: 1});

        this.addChild(this.grTarget);
        this.addChild(this.gr);

        this.on('pointerenter', this.onHover, this);
        this.on('pointerleave', this.onUnHover, this);
    }

    public update()
    {
        if (this.marble.dropped)
        {
            this.visible = false;
        }
        if (this.marble.targetable)
        {
            this.grTarget.visible = true;
            this.eventMode = 'static';
        }
        else
        {
            this.grTarget.visible = false;
            this.eventMode = 'none';
        }
    }

    private onHover()
    {
        this.scale.set(1.1);
    }

    private onUnHover()
    {
        this.scale.set(1);
    }
}

export default MarbleView;