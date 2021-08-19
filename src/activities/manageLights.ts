import * as child from 'child_process';
import { SensorDataType } from '../interfaces/dataObjects';


export async function manageLights(sensorData:SensorDataType): Promise<string> {
  const LIGHTS_IP_ADDRESS = process.env.LIGHTS_IP_ADDRESS || '192.168.0.43';
  const GREENHOUSE_LIGHT_MIN = 50; // if for some reason it's bright in the chamber for another reason, hopefully it won't be more than 50 lumens. It will probably never be less than 5-10 lumens, so 0 isnt a good minimum.
  const newState = sensorData.light < GREENHOUSE_LIGHT_MIN ? 'on' : 'off'
  console.log("[activities/manageLights] decision made to turn lights to state "+newState)
  child.exec(`./tplink_smartplug.py -t ${LIGHTS_IP_ADDRESS} -c ${newState}`, async (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return 'fail!!!!';
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return 'fail!!!';
    }
  })
  return newState
}
