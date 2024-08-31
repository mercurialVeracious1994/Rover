import { Command } from "../enums/Commands";
import {Direction, DirectionMap} from "../utility/DirectionMap"

export type Coordinate = {
    x: number,
    y: number
}
type Location ={
    coordinate: Coordinate, direction: Direction
}
type TrackCommand = {currentLocation:Location, prevLocation: Location, command: Command};
export class Robot{
    latestLocation: Location
    coordinateLimit: Coordinate
    commands: TrackCommand[]

    constructor(coordinateLimit: Coordinate, latestLocation = {coordinate:{x:0,y:0}, direction: Direction.NORTH}, commands =[]){
       this.latestLocation = latestLocation;
       this.coordinateLimit = coordinateLimit;
       this.commands = commands;
    }
     move = () => {
        const prevLocation ={ ...this.latestLocation };
        const location = { x:DirectionMap[this.latestLocation.direction].MOVE.x  + this.latestLocation.coordinate.x, 
            y: DirectionMap[this.latestLocation.direction].MOVE.y  + this.latestLocation.coordinate.y }
        if(this.validateLocation(location)){
            this.latestLocation.coordinate = location;
            this.trackCommand(Command.MOVE, prevLocation);
        }
        else{
            console.log("Will fall off from edge, skipping the command MOVE");
        }
    }
    
     left = () => {
        const prevLocation ={ ...this.latestLocation };
        this.latestLocation.direction = DirectionMap[this.latestLocation.direction].LEFT;
        this.trackCommand(Command.LEFT, prevLocation);
    }
     right = () => {
        const prevLocation ={ ...this.latestLocation };
        this.latestLocation.direction = DirectionMap[this.latestLocation.direction].RIGHT;
        this.trackCommand(Command.RIGHT, prevLocation);
    }
    
     report = () =>{
        console.log(" Robot is currently at ", this.latestLocation.coordinate, "facing ", this.latestLocation.direction);
    }
     place = (robotLocation:string) =>{
        const prevLocation ={ ...this.latestLocation };
        const robotInstructions = robotLocation.split(",");
        const coordinate: Coordinate ={ x:parseInt(robotInstructions[0]),y: parseInt(robotInstructions[1])};
        this.latestLocation ={ coordinate, direction: robotInstructions[2].toString() as Direction};
        this.trackCommand(Command.PLACE, prevLocation);
    }
    validateLocation = (location:Coordinate) =>{
        return location.x>=0 && location.y >=0 && location.x<= this.coordinateLimit.x && location.y <= this.coordinateLimit.y
    }
    trackCommand = (command: string,prevLocation: Location) =>{
        this.commands.push({
            prevLocation: prevLocation,
            currentLocation:{...this.latestLocation},
            command: Command[command as keyof typeof Command]
        })
    }
    printLastNCommands = (count: number) =>{
        const commandsList =  this.commands.slice(1,count+1); // need to print the PLACE command
         commandsList.forEach(({prevLocation,command})=>{
          console.log("(",prevLocation.coordinate.x, ",", 
            prevLocation.coordinate.y, ",",
            prevLocation.direction, ") ",
            command);
         });
        console.log("(", this.latestLocation.coordinate.x,",", 
        this.latestLocation.coordinate.y,",", 
        this.latestLocation.direction,")" );
    }
}

