import { Workflow } from '@temporalio/workflow';
import { SensorDataType } from './dataObjects';
export interface Example extends Workflow {
    main(name: string): Promise<string>;
}
export interface NoahMain extends Workflow {
    main(object: SensorDataType): Promise<string>;
}
export interface ReadSensor extends Workflow {
    main(): Promise<SensorDataType>;
    signals: {
        runWithNewData(object: SensorDataType): void;
    };
}
export interface ManageLights extends Workflow {
    main(): Promise<void>;
    signals: {
        runWithNewData(object: SensorDataType): void;
    };
}
export interface Blocked extends Workflow {
    main(): Promise<void>;
    signals: {
        runWithNewData(object: SensorDataType): void;
    };
}
//# sourceMappingURL=workflows.d.ts.map