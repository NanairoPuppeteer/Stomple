let Config = {
    width: 800,
    height: 800,
    lines: 9,
    columns: 9,
    players: 6,
    colors: [
        "red",
        "green",
        "blue",
        "gray",
        "yellow",
        "purple",
        "cyan",
        "orange",
        "pink"
    ]
}

let minHeight: number = Math.ceil(Config.players/2)*75 + 80;

Config.width = Config.columns*70 + 170;
Config.height = Math.max(Config.lines*70 + 25, minHeight);

export default Config;