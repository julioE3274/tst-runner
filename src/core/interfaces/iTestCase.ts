import { LogicArgsType } from "../types/logicArgs.type";
import { LogicReturnType } from "../types/logicReturn.type";

export interface ITestCase {

    testCaseName: string;
    instances: IInstanceTestCase[];
    uuid: string;
    run: any;

}
export interface IInstanceTestCase<T = any> {
    expectedResult: LogicReturnType<T>;
    inParams: LogicArgsType<T>;
    result?: LogicReturnType<T>;
    success?: boolean;
    uuid?: string;
    logs?: IInstanceTestCase<T>[];
    [key: string]: any;
}
