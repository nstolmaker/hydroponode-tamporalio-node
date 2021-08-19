import { Workflow } from '@temporalio/workflow';
import { SensorDataType } from './dataObjects';

// Extend the generic Workflow interface to check that Example is a valid workflow interface
// Workflow interfaces are useful for generating type safe workflow clients
export interface Example extends Workflow {
  main(name: string): Promise<string>;
}

export interface PlantRobot extends Workflow {
  main(object:SensorDataType): Promise<string>;
}

export interface ManageLights extends Workflow {
  main(): Promise<void>;
  signals: {
    runWithNewData(object:SensorDataType): void;
  };
}

/* shouldnt need this anymor eit was from the demo */
export interface Blocked extends Workflow {
  main(): Promise<void>;
  signals: {
    runWithNewData(object:SensorDataType): void;
  };
}
