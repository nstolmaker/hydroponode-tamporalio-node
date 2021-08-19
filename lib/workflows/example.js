"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workflow = void 0;
const greeter_1 = require("@activities/greeter");
const fake_progress_1 = require("@activities/fake-progress");
// A workflow that simply calls an activity
async function main(name) {
    fake_progress_1.fakeProgress(1000);
    return greeter_1.greet(name);
}
// Declare the workflow's type to be checked by the Typescript compiler
exports.workflow = { main };
//# sourceMappingURL=example.js.map