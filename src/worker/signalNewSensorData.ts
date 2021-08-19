import { Connection, WorkflowClient } from '@temporalio/client';
import { SensorDataType } from '../interfaces/dataObjects';
import { Blocked, Example, PlantRobot, ManageLights } from '../interfaces/workflows';

async function run() {
  // Connect to localhost with default ConnectionOptions,
  // pass options to the Connection constructor to configure TLS and other settings.
  const connection = new Connection();
  // Workflows will be started in the "default" namespace unless specified otherwise
  // via options passed the WorkflowClient constructor.
  const client = new WorkflowClient(connection.service);
  // Create a typed client using the ReadSensor interface, which expects a return in the form of a Promise<SensorDataType>;
  // Basically it says, make a new instance of the workflow called 'readSensor.ts', which will use the taskQueue called 'sensorData'
  // 
  console.log("[worker/signalNewSensorData.ts] going to start lights workflow ")
  const sensorDataForTesting:SensorDataType = {
    battery: 1142,
    temp: 1178.25999999999999,
    moisture: 1152,
    light: 24
   }
  const workflowStubClient = client.stub<PlantRobot>('plantRobot', { taskQueue: 'sensorData' })
  const test = await workflowStubClient.execute(sensorDataForTesting)
  console.log("[worker/signalNewSensorData.ts] execution returned: ", test)
  return test
  // const newRun = await workflowStubClient.signal.runWithNewData(sensorDataForTesting)


  // return await sensorData.result();
  // sensorData.signalWithStart("runWithNewData", [sensorDataForTesting], [])
  // return newRun
  // console.log("[Worker/readSensor] Got new sensor data!", result); // should basically just emit an event with the new sensor data I think?
// }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
