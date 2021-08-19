import { Context } from '@temporalio/activity'
// import { CancelledFailure } from '@temporalio/common';

export async function fakeProgress(sleepIntervalMs = 1000): Promise<void> {
  try {
    for (let progress = 1; progress < 100; ++progress) {
      // sleep for given interval or throw if activity is cancelled
      await Context.current().sleep(sleepIntervalMs)
      Context.current().heartbeat(progress)
      console.log('heartbeat: '+progress)
    }
  } catch (err) {
    // if (err instanceof CancelledFailure) {
      // cleanup
      // console.log("error triggered but is instance of CancelledFailure, so thats okay!!!")
    // }
    throw err
  }
}