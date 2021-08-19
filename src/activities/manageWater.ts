import { Context } from '@temporalio/activity'
import { SensorDataType } from '../interfaces/dataObjects'
// import { CancelledFailure } from '@temporalio/common';

export async function manageWater(sensorData:SensorDataType, secsToWaterFor:number): Promise<string> {
  const sleepIntervalMs = 1000
  const GREENHOUSE_MOISTURE_MIN = 43
  try {
    console.log("[activities/manageWater] started")
    if (sensorData.moisture <= GREENHOUSE_MOISTURE_MIN) {
      console.log(`[activities/manageWater] needs to be watered for ${secsToWaterFor} seconds.`)
      for (let progress:number = 0; progress < secsToWaterFor; ++progress) {
        // sleep for given interval or throw if activity is cancelled
        await Context.current().sleep(sleepIntervalMs)
        Context.current().heartbeat(progress)
        console.log('[activities/manageWater] heartbeat: '+Math.floor(((progress+1)/secsToWaterFor)*100) + '%')
      }
      console.log("[activities/manageWater] finished watering.")
      return Promise.resolve('Watered')
    } else {
      return Promise.resolve('No watering needed')
    }
  } catch (err) {
    // if (err instanceof CancelledFailure) {
      // cleanup
      // console.log("error triggered but is instance of CancelledFailure, so thats okay!!!")
    // }
    throw err
  }
}