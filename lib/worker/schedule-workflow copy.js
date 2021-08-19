"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@temporalio/client");
async function run() {
    // Connect to localhost with default ConnectionOptions,
    // pass options to the Connection constructor to configure TLS and other settings.
    const connection = new client_1.Connection();
    // Workflows will be started in the "default" namespace unless specified otherwise
    // via options passed the WorkflowClient constructor.
    const client = new client_1.WorkflowClient(connection.service);
    // Create a typed client using the Example Workflow interface,
    const example = client.stub('example', { taskQueue: 'tutorial' });
    const result = await example.execute('Temporal');
    console.log(result); // Hello, Temporal!
}
run().catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=schedule-workflow%20copy.js.map