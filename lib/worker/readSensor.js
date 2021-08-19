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
    // Create a typed client using the ReadSensor interface, which expects a return in the form of a Promise<SensorDataType>;
    // Basically it says, make a new instance of the workflow called 'readSensor.ts', which will use the taskQueue called 'sensorData'
    // 
    // const worker = client.stub<NoahMain>('noahMain', { taskQueue: 'sensorData' });
    // const execution = await worker.start()
    // console.log("[worker/readSensor.ts] noahMain worker started with executionid of "+execution)
    // console.log("[Worker/readSensor] Got new sensor data!", result); // should basically just emit an event with the new sensor data I think?
    // }
}
run().catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=readSensor.js.map