"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workflow = void 0;
const workflow_1 = require("@temporalio/workflow");
const readSensor_1 = require("@activities/readSensor");
const unblocked = new workflow_1.Trigger();
const signals = {
    runWithNewData(sensorData) {
        console.log("running with new data from sensor: ", sensorData);
        unblocked.resolve(sensorData);
    }
};
// the workflow
async function main() {
    try {
        return readSensor_1.readSensor();
    }
    catch (err) {
        // if (!(err instanceof CancelledFailure)) {
        throw err;
        // }
        console.log('Cancelled');
    }
}
// Declare the workflow's type to be checked by the Typescript compiler
exports.workflow = { main, signals };
//# sourceMappingURL=readSensor.js.map