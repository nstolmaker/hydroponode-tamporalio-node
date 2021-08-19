"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manageWater = void 0;
const activity_1 = require("@temporalio/activity");
// import { CancelledFailure } from '@temporalio/common';
async function manageWater(sensorData, secsToWaterFor) {
    const sleepIntervalMs = 1000;
    const GREENHOUSE_MOISTURE_MIN = 43;
    try {
        console.log("[activities/manageWater] started");
        if (sensorData.moisture <= GREENHOUSE_MOISTURE_MIN) {
            console.log(`[activities/manageWater] needs to be watered for ${secsToWaterFor} seconds.`);
            for (let progress = 0; progress < secsToWaterFor; ++progress) {
                // sleep for given interval or throw if activity is cancelled
                await activity_1.Context.current().sleep(sleepIntervalMs);
                activity_1.Context.current().heartbeat(progress);
                console.log('[activities/manageWater] heartbeat: ' + Math.floor(((progress + 1) / secsToWaterFor) * 100) + '%');
            }
            console.log("[activities/manageWater] finished watering.");
            return Promise.resolve('Watered');
        }
        else {
            return Promise.resolve('No watering needed');
        }
    }
    catch (err) {
        // if (err instanceof CancelledFailure) {
        // cleanup
        // console.log("error triggered but is instance of CancelledFailure, so thats okay!!!")
        // }
        throw err;
    }
}
exports.manageWater = manageWater;
//# sourceMappingURL=manageWater.js.map