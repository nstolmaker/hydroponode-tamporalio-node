import { PlantRobot } from '../interfaces/workflows'
import { manageLights } from '@activities/manageLights'
import { manageWater } from '@activities/manageWater'
import { SensorDataType } from '../interfaces/dataObjects';

const signals = {
  runWithNewData(sensorData:SensorDataType): void {
    console.log("[workflows/plantRobot] unning with new data from sensor: ", sensorData)
    // main(sensorData)
    // unblocked.resolve(sensorData);
  }
};

// the workflow
async function main(sensorData:SensorDataType): Promise<string> {
  try {
    console.log("[workflows/plantRobot] Running main workflow with new sensorData:", sensorData)

    // call the readSensor activity
    // const sensorData = await readSensor()
    console.log("[workflows/plantRobot] got new sensor data: ", sensorData)

    const lightsStatus = await manageLights(sensorData)
    console.log("[workflows/plantRobot] returned with ", lightsStatus)

    const waterStatus = await manageWater(sensorData, 7)
    console.log("[workflows/plantRobot:manageWater] returned with status: ", waterStatus)

    return Promise.resolve("[workflows/plantRobot] seems to have finished")
  } catch (err) {
    console.log('[workflows/plantRobot] Cancelled');
    // if (!(err instanceof CancelledFailure)) {
      throw err;
    // }

  }
}

// Declare the workflow's type to be checked by the Typescript compiler
export const workflow: PlantRobot = { main, signals };
