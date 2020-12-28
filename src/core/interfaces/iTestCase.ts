import { LogicArgsType } from "../types/logicArgs.type";
import { LogicReturnType } from "../types/logicReturn.type";

export interface ITestCase {

    testCaseName: string;
    instances: IInstanceTestCase[];

    run: any;

}
export interface IInstanceTestCase<T = any> {
    expectedResult: LogicReturnType<T>;
    inParams: LogicArgsType<T>;
}
