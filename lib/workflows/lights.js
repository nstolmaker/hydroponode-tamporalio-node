"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workflow = void 0;
const workflow_1 = require("@temporalio/workflow");
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
        console.log('Blocked');
        await unblocked;
        console.log('Unblocked');
    }
    catch (err) {
        // if (!(err instanceof CancelledFailure)) {
        throw err;
        // }
        console.log('Cancelled');
    }
    return;
}
// Declare the workflow's type to be checked by the Typescript compiler
exports.workflow = { main, signals };
//# sourceMappingURL=lights.js.map