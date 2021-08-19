"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workflow = void 0;
const manageLights_1 = require("@activities/manageLights");
const manageWater_1 = require("@activities/manageWater");
const signals = {
    runWithNewData(sensorData) {
        console.log("[workflows/plantRobot] unning with new data from sensor: ", sensorData);
        // main(sensorData)
        // unblocked.resolve(sensorData);
    }
};
// the workflow
async function main(sensorData) {
    try {
        console.log("[workflows/plantRobot] Running main workflow with new sensorData:", sensorData);
        // call the readSensor activity
        // const sensorData = await readSensor()
        console.log("[workflows/plantRobot] got new sensor data: ", sensorData);
        const lightsStatus = await manageLights_1.manageLights(sensorData);
        console.log("[workflows/plantRobot] returned with ", lightsStatus);
        const waterStatus = await manageWater_1.manageWater(sensorData, 7);
        console.log("[workflows/plantRobot:manageWater] returned with status: ", waterStatus);
        return Promise.resolve("[workflows/plantRobot] seems to have finished");
    }
    catch (err) {
        console.log('[workflows/plantRobot] Cancelled');
        // if (!(err instanceof CancelledFailure)) {
        throw err;
        // }
    }
}
// Declare the workflow's type to be checked by the Typescript compiler
exports.workflow = { main, signals };
//# sourceMappingURL=plantRobot.js.map