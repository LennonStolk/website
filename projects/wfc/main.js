// Constants
var TILES = data.tiles;
var TEMPLATES = data.templates;
var ELEMENT_GRID = document.getElementById("grid");
var ELEMENT_CONSOLE = document.getElementById("console");
var ELEMENT_COMMANDS_PORTION = document.getElementById("commands-portion");
var ELEMENT_TILE_LIST = document.getElementById("tile-list");
var ELEMENT_SUBMIT = document.getElementById("submit");
var ELEMENT_INPUT = document.getElementById("input");
var DIRECTIONS = ["north", "east", "south", "west"];

//Globals
var grid_tiles;
var grid_dimensions = {width: 20, height: 20};
var tile_options;

set_up();


function set_up() 
{
    tile_options = [];
    grid_tiles = get_default_grid(grid_dimensions.width, grid_dimensions.height);

    TILES.forEach(tile => 
    {
        let div = document.createElement("div");
        div.classList.add("tile-list-item");
        div.id = tile.id;
        let img = document.createElement("img");
        img.classList.add("tile-img");
        img.src = "tiles/" + tile.src;
        let name = document.createElement("h6");
        name.classList.add("tile-list-name");
        name.innerText = tile.name;
        div.appendChild(img);
        div.appendChild(name);
        ELEMENT_TILE_LIST.appendChild(div);

        tile_options[tile.id] = {
            north: [],
            east: [],
            south: [],
            west: []
        };
    });
    
    ELEMENT_SUBMIT.removeEventListener("click", submit_commands);
    ELEMENT_SUBMIT.addEventListener("click", submit_commands);
}


function get_default_grid(width, height)
{
    let grid = [];
    for (let x = 0; x < width; x++)
    {
        let column = [];
        for (let y = 0; y < height; y++)
        {
            column.push({
                x,
                y,
                done: false,
                options: [...Array(TILES.length).keys()]
            });
        }
        grid.push(column);
    }
    return grid;
}


function render_display_grid()
{
    ELEMENT_GRID.innerHTML = "";

    grid_tiles.forEach((column, x) => 
    {
        column.forEach((tile, y) => 
        {
            let img = document.createElement("img");
            

            if (tile.options.length == 0)
            {
                var tileBeneath = grid_tiles[tile.x][tile.y + 1];
                var waterTiles = [5, 6, 7, 9, 10, 11, 15];

                if (tileBeneath != undefined && tileBeneath.options[0] == 8) {
                    img.src = "tiles/tile017.png";
                }
                else if (tileBeneath != undefined && waterTiles.includes(tileBeneath.options[0])) {
                    img.src = "tiles/tile018.png";
                }
                else {
                    img.src = "tiles/tile016.png";
                }
            }
            else
            {
                img.src = "tiles/" + TILES[tile.options[0]].src;
            }
            img.style.width = 100 / grid_dimensions.width + "%";
            img.style.height = 100 / grid_dimensions.height + "%";
            img.style.imageRendering = "optimizeSpeed";
            ELEMENT_GRID.appendChild(img);
        });
    });
}


function wave_function_collapse()
{   
    grid_tiles = get_default_grid(grid_dimensions.width, grid_dimensions.height);

    /* INSTANT */
    // while (grid_tiles.flat(1).some(tile => tile.options.length > 1))
    // {
    //     wave_function_collapse_cycle();
    // }
    // render_display_grid();

    /* ANIMATED */
    var interval = setInterval(() => {
        wave_function_collapse_cycle();
        render_display_grid();

        if (!(grid_tiles.flat(1).some(tile => tile.options.length > 1))) {
            clearInterval(interval);
        }
    }, 1);
}


function wave_function_collapse_cycle()
{
    let lowest_entropy_tile = get_lowest_entropy_tile(grid_tiles);
    let confirmed_tile = get_random_option_from_tile(lowest_entropy_tile);
    lowest_entropy_tile.options = [confirmed_tile];
        
    reduce_options_neighbour_tiles(lowest_entropy_tile, confirmed_tile);
}

function reduce_options_neighbour_tiles(target_tile, confirmed_tile)
{
    let neighbour_coordinates = [
        { x: target_tile.x+0, y: target_tile.y-1, direction: "north" },
        { x: target_tile.x+1, y: target_tile.y+0, direction: "east" },
        { x: target_tile.x+0, y: target_tile.y+1, direction: "south" },
        { x: target_tile.x-1, y: target_tile.y+0, direction: "west" },
    ].filter(coords => 
        coords.x >= 0 && 
        coords.y >= 0 && 
        coords.x < grid_dimensions.width &&
        coords.y < grid_dimensions.height
    );

    neighbour_coordinates.forEach(coordinate => 
    {
        let neighbour = grid_tiles[coordinate.x][coordinate.y];
        if (neighbour.options.length > 1)
        {
            neighbour.options = neighbour.options.filter(option => 
            {
                return tile_options[confirmed_tile][coordinate.direction].includes(option);
            });
            
            if (neighbour.options.length == 1)
                reduce_options_neighbour_tiles(neighbour, neighbour.options[0]);
        }
    });
}


function get_lowest_entropy_tile(grid)
{
    let lowest_entropy_tile = {options: new Array(17)};
    for (let x = 0; x < grid_dimensions.width; x++)
    {
        for (let y = 0; y < grid_dimensions.height; y++)
        {
            let tile = grid[x][y];
            if (tile.options.length < 2) continue;
            if (tile.options.length < lowest_entropy_tile.options.length)
                lowest_entropy_tile = tile;
        }
    }
    return lowest_entropy_tile;
}


function get_random_option_from_tile(tile)
{
    let random_index = Math.floor(Math.random() * tile.options.length);
    return tile.options[random_index];
}


function submit_commands()
{
    let commands = ELEMENT_INPUT.value
        .trim()
        .replaceAll("> ", "")
        .toLowerCase()
        .split("\n");
    ELEMENT_INPUT.value = "";

    console.log(ELEMENT_COMMANDS_PORTION);

    if (ELEMENT_INPUT.value == "" && ELEMENT_COMMANDS_PORTION.children.length == 0) {
        commands = landscape
        .trim()
        .replaceAll("> ", "")
        .toLowerCase()
        .split("\n");
    }
    
    commands.forEach(command => 
    {
        handle_command(command);
        add_command_to_console(command);
    });

    wave_function_collapse();
}


function handle_command(command)
{
    command = command.replaceAll(",", "");
    command = command.replaceAll("or", "");
    command = command.replaceAll("and", "");
    command = command.replaceAll("  ", " ");
    command = command.replaceAll("'", "");

    let words = command.split(" ");

    switch(words[0]) 
    {
        case "clear":
            clear();
            return;
        case "grid":
            let size = words[1];
            grid_dimensions = { width: size, height: size };
            wave_function_collapse();
        default:
            add_option_from_command(words);
            return;
    }
}

function clear()
{
    ELEMENT_COMMANDS_PORTION.innerText = "";
}

function add_option_from_command(words)
{
    // Example command: "south of water-rock can be red-flowers yellow-flowers"
    let location = words[0];
    let current_tile = get_tile_by_name(words[2]);
    let action = words[3];
    let option_tiles = words
        .slice(4)
        .map(get_tile_by_name)
        .filter(tile => tile != undefined);

    if (current_tile == undefined || option_tiles.length == 0)
        return;
    
    if (DIRECTIONS.includes(location)) // Single direction
    {
        option_tiles.forEach(option_tile => 
        {   
            add_option(current_tile, option_tile, location, action);
        });
    }
    else if (location == "next") // All directions
    {
        option_tiles.forEach(option_tile => 
        {
            DIRECTIONS.forEach(direction => 
            {
                add_option(current_tile, option_tile, direction, action);
            });
        });
    }
}

function add_option(current_tile, option_tile, location, action)
{
    let target_array = tile_options[current_tile.id][location];
    let opposite_target_array = tile_options[option_tile.id][get_opposite_location(location)];

    if (action == "can" && (target_array.includes(option_tile.id) == false))
    {
        target_array.push(option_tile.id);
        opposite_target_array.push(current_tile.id);
    }
    else if (action == "cant" && (target_array.includes(option_tile.id) == true))
    {
        target_array.splice(target_array.indexOf(option_tile.id));
        opposite_target_array.splice(target_array.indexOf(current_tile.id));
    }
}

function get_tile_by_name(name) 
{
    return TILES.find(tile => tile.name == name);
}

function get_opposite_location(location)
{
    switch (location)
    {
        case "north":
            return "south";
        case "east":
            return "west";
        case "south":
            return "north";
        case "west":
            return "east";
    }
}


function add_command_to_console(text) 
{
    text = text.trim();
    if (text === "") return;

    let div = document.createElement("div");
    div.innerText = "> " + text;
    ELEMENT_COMMANDS_PORTION.appendChild(div);
}

var landscape = `
next to grass can be grass or red-flowers or yellow-flowers or grass-rock
north of grass can be water-bottom or water-bottom-right or water-bottom-left or tree-bottom
south of grass can be water-top or water-top-left or water-top-right or tree-top
east of grass can be water-top-left or water-left or water-bottom-left or tree-top or tree-bottom
west of grass can be water-top-right or water-right or water-bottom-right or tree-top or tree-bottom

next to red-flowers can be grass or red-flowers or yellow-flowers or grass-rock
north of red-flowers can be water-bottom or water-bottom-right or water-bottom-left or tree-bottom
south of red-flowers can be water-top or water-top-left or water-top-right or tree-top
east of red-flowers can be water-top-left or water-left or water-bottom-left or tree-top or tree-bottom
west of red-flowers can be water-top-right or water-right or water-bottom-right or tree-top or tree-bottom

next to yellow-flowers can be grass or red-flowers or yellow-flowers or grass-rock
north of yellow-flowers can be water-bottom or water-bottom-right or water-bottom-left or tree-bottom
south of yellow-flowers can be water-top or water-top-left or water-top-right or tree-top
east of yellow-flowers can be water-top-left or water-left or water-bottom-left or tree-top or tree-bottom
west of yellow-flowers can be water-top-right or water-right or water-bottom-right or tree-top or tree-bottom

next to grass-rock can be grass or red-flowers or yellow-flowers or grass-rock
north of grass-rock can be water-bottom or water-bottom-right or water-bottom-left or tree-bottom
south of grass-rock can be water-top or water-top-left or water-top-right or tree-top
east of grass-rock can be water-top-left or water-left or water-bottom-left or tree-top or tree-bottom
west of grass-rock can be water-top-right or water-right or water-bottom-right or tree-top or tree-bottom

north of tree-top can be grass or red-flowers or yellow-flowers or grass-rock or water-bottom or water-bottom-right or water-bottom-left or tree-bottom
south of tree-top can be tree-bottom
east of tree-top can be grass or red-flowers or yellow-flowers or grass-rock or water-top-left or water-left or water-bottom-left or tree-top or tree-bottom
west of tree-top can be grass or red-flowers or yellow-flowers or grass-rock or water-top-right or water-right or water-bottom-right or tree-top or tree-bottom

north of tree-bottom can be tree-top
south of tree-bottom can be grass or red-flowers or yellow-flowers or grass-rock or water-top or water-top-left or water-top-right or tree-top
east of tree-bottom can be grass or red-flowers or yellow-flowers or grass-rock or water-top-left or water-left or water-bottom-left or tree-top or tree-bottom
west of tree-bottom can be grass or red-flowers or yellow-flowers or grass-rock or water-top-right or water-right or water-bottom-right

next to water can be water or water-rock
north of water can be water-top or water-top-left or water-top-right
south of water can be water-bottom or water-bottom-right or water-bottom-left
east of water can be water-top-right or water-right or water-bottom-right
west of water can be water-top-left or water-left or water-bottom-left

next to water-rock can be water or water-rock
north of water-rock can be water-top or water-top-left or water-top-right
south of water-rock can be water-bottom or water-bottom-right or water-bottom-left
east of water-rock can be water-top-right or water-right or water-bottom-right
west of water-rock can be water-top-left or water-left or water-bottom-left

north of water-top-left can be grass or red-flowers or yellow-flowers or grass-rock or tree-bottom or water-bottom-left
south of water-top-left can be water-left or water or water-rock
east of water-top-left can be water-top or water or water-rock
west of water-top-left can be grass or red-flowers or yellow-flowers or grass-rock or tree-bottom or tree-top or water-top-right

north of water-top can be grass or red-flowers or yellow-flowers or grass-rock or tree-bottom or water-bottom
south of water-top can be water or water-rock
east of water-top can be can be water-top or water-top-right or water or water-rock
west of water-top can be can be water-top or water-top-left or water or water-rock

north of water-top-right can be grass or red-flowers or yellow-flowers or grass-rock or tree-bottom or water-bottom-right
south of water-top-right can be water-right or water or water-rock
east of water-top-right can be grass or red-flowers or yellow-flowers or grass-rock or tree-bottom or tree-top or water-top-left
west of water-top-right can be water-top or water or water-rock

north of water-left can be water-top-left or water-left or water or water-rock
south of water-left can be water-bottom-left or water-left or water or water-rock
east of water-left can be water or water-rock or water-right
west of water-left can be red-flowers or yellow-flowers or grass-rock or grass or tree-bottom or tree-top

north of water-right can be water-top-right or water-right or water or water-rock
south of water-right can be water-bottom-right or water-right or water or water-rock
east of water-right can be grass or red-flowers or yellow-flowers or grass-rock or tree-bottom or tree-top
west of water-right can be can be water or water-rock

north of water-bottom-left can be water-left or water or water-rock
south of water-bottom-left can be grass or red-flowers or yellow-flowers or grass-rock or tree-top or water-top-left
east of water-bottom-left can be water-bottom or water or water-rock
west of water-bottom-left can be grass or red-flowers or yellow-flowers or grass-rock or tree-bottom or tree-top or water-bottom-right

north of water-bottom can be water or water-rock or water-top
south of water-bottom can be grass or red-flowers or yellow-flowers or grass-rock or tree-top
east of water-bottom can be water-bottom or water-bottom-right or water or water-rock
west of water-bottom can be water-bottom or water-bottom-left or water or water-rock

north of water-bottom-right can be water-right or water or water-rock
south of water-bottom-right can be grass or red-flowers or yellow-flowers or grass-rock or tree-top or water-top-right
east of water-bottom-right can be grass or red-flowers or yellow-flowers or grass-rock or tree-bottom or tree-top or water-bottom-left
west of water-bottom-right can be water-bottom or water or water-rock`