import { Robot } from "./robot";

export class Mars {
     MAX_X_AXIS: number;
     MAX_Y_AXIS: number;
    robots: Robot[] | undefined;
    
    constructor(robots?: Robot[], x =5,  y =5){
        this.MAX_X_AXIS = x;
        this.MAX_Y_AXIS = y;
        this.robots = robots;
    }
    getCoordinateLimit = () => {
        return {x: this.MAX_X_AXIS, y: this.MAX_Y_AXIS};
    }
    landRobot = (robot: Robot) => {
        this.robots?.push(robot);
    }
}