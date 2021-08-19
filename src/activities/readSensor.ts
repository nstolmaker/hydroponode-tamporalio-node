import { SensorDataType } from '../interfaces/dataObjects'

export async function readSensor(): Promise<SensorDataType> {
  // const getSensorValues = async ()=>{ 
    return {
     battery: 42,
     temp: 78.25999999999999,
     moisture: 52,
     light: 24
    }
  // }
  // return getSensorValues()
}
