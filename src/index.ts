import * as readline from 'readline';
import {Robot} from "./models/robot"
import {Command} from "./enums/Commands"
import { Mars } from './models/mars';

console.log(" Enter the command followed by coordinate and direction (coma seperated without space)" +
     "for Robot to place. Enter other commands in seperate line, the moment you type report it will"+
     " process all commands")

const readInput = readline.createInterface({
  input: process.stdin,
})
const mars = new Mars();
const robot = new Robot(mars.getCoordinateLimit());
mars.landRobot(robot);

readInput.on('line', (line) => {
    const text = line.split(" ");
    const command = text[0]
   
    switch(command){
      case Command.PLACE:
        const robotLocation = text[1];
        robot.place(robotLocation);
        break;
      case Command.LEFT:
        robot.left();
        break;
      case Command.RIGHT:
        robot.right();
        break;
      case Command.MOVE:
        robot.move();
        break;
      case Command.REPORT:
        robot.report();
        break;
      case Command.TRACK:
        const count = parseInt(text[1]);
        if(count>0){
          robot.printFirstNCommands(count);
        }
        else{
          console.log("Provide a valid number for tracking");
        }
       break;
      case Command.BACKTRACK:
        const backTrackTOCommand = parseInt(text[1]);
        if(backTrackTOCommand>0){
          robot.backTrackToLastNCommand(backTrackTOCommand);
        }
        else{
          console.log("Provide a valid number for tracking");
        }
        break;
      default:
        console.log("Sorry, I couldn't get the command please enter again!");
        break;
    }
 })