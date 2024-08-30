import { Command } from "../enums/Commands";
import {Direction, DirectionMap} from "../utility/DirectionMap"

export type Coordinate = {
    x: number,
    y: number
}

export class Robot{
    coordinate: Coordinate;
    direction: Direction;
    coordinateLimit: Coordinate
    commands: {coordiante: Coordinate, direction: Direction, command: Command}[]

    constructor(coordinateLimit: Coordinate, coordinate={x:0,y:0}, direction = Direction.NORTH, commands =[]){
       this.coordinate = coordinate;
       this.direction = direction;
       this.coordinateLimit = coordinateLimit;
       this.commands = commands;
    }
     move = () => {
        const location = { x:DirectionMap[this.direction].MOVE.x  + this.coordinate.x, 
            y: DirectionMap[this.direction].MOVE.y  + this.coordinate.y }
        if(this.validateLocation(location)){
            this.coordinate = location;
        }
        else{
            console.log("Will fall off from edge, skipping the command MOVE");
        }
    }
    
     left = () => {
        this.direction = DirectionMap[this.direction].LEFT;
        
    }
     right = () => {
        this.direction = DirectionMap[this.direction].RIGHT;
    }
    
     report = () =>{
        console.log(" Robot is currently at ", this.coordinate, "facing ", this.direction);
    }
     place = (robotLocation:string) =>{
        const robotInstructions = robotLocation.split(",");
        const coordinate: Coordinate ={ x:parseInt(robotInstructions[0]),y: parseInt(robotInstructions[1])};
        this.coordinate = coordinate;
        this.direction = robotInstructions[2].toString() as Direction
    }
    validateLocation = (location:Coordinate) =>{
        return location.x<= this.coordinateLimit.x && location.y <= this.coordinateLimit.y
    }
    trackCommand = (command: string) =>{
        this.commands.push({coordiante:this.coordinate, direction: this.direction, command: Command[command as keyof typeof Command]})
    }
}

