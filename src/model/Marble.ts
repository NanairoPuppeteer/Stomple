class Marble
{
    public colorId: number;
    public line: number;
    public column: number;

    private _dropped: boolean;
    private _targetable: boolean = false;

    public get dropped(): boolean
    {
        return this._dropped;
    }

    public get targetable(): boolean
    {
        return this._targetable;
    }

    public set targetable(value: boolean)
    {
        if (this._dropped)
        {
            return;
        }
        this._targetable = value;
    }
    
    constructor(colorId: number, line: number, column: number)
    {
        this.colorId = colorId;
        this.line = line;
        this.column = column;
        this._dropped = false;
        this._targetable = false
    }

    public drop()
    {
        this._dropped = true;
        this._targetable = false;
    }
}

export default Marble;