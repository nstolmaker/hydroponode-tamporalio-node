"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeProgress = void 0;
const activity_1 = require("@temporalio/activity");
// import { CancelledFailure } from '@temporalio/common';
async function fakeProgress(sleepIntervalMs = 1000) {
    try {
        for (let progress = 1; progress < 100; ++progress) {
            // sleep for given interval or throw if activity is cancelled
            await activity_1.Context.current().sleep(sleepIntervalMs);
            activity_1.Context.current().heartbeat(progress);
            console.log('heartbeat: ' + progress);
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
exports.fakeProgress = fakeProgress;
//# sourceMappingURL=fake-progress.js.map