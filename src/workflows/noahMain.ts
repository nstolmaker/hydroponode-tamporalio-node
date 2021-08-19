import { Trigger } from '@temporalio/workflow';
import { Example, ReadSensor, NoahMain } from '../interfaces/workflows';
import { readSensor } from '@activities/readSensor';
import { manageLights } from '@activities/manageLights'
import { SensorDataType } from '../interfaces/dataObjects';

import {Blocked} from "../interfaces/workflows";

// const unblocked = new Trigger<SensorDataType>();

const signals = {
  runWithNewData(sensorData:SensorDataType): void {
    console.log("[workflows/noahMain] unning with new data from sensor: ", sensorData)
    // main(sensorData)
    // unblocked.resolve(sensorData);
  }
};

// the workflow
async function main(sensorData:SensorDataType): Promise<string> {
  try {
    console.log("[workflows/noahMain] Running main workflow with new sensorData:", sensorData)

    // call the readSensor activity
    // const sensorData = await readSensor()
    console.log("[workflows/noahMain] got new sensor data: ", sensorData)

    const lightsStatus = await manageLights(sensorData)
    console.log("[workflows/noahMain] returned with ", lightsStatus)

    return Promise.resolve("[workflows/noahMain] seems to have finished")
  } catch (err) {
    console.log('[workflows/noahMain] Cancelled');
    // if (!(err instanceof CancelledFailure)) {
      throw err;
    // }

  }
}

// Declare the workflow's type to be checked by the Typescript compiler
export const workflow: NoahMain = { main, signals };
