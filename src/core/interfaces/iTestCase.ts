export interface ITestCase {

    testCaseName: string;
    instances: IInstanceTestCase[];

    run: ( expectedResult: any, ... inParams: any ) => Promise<boolean>;

}
export interface IInstanceTestCase<LogicFunctionType extends ( ...arg: any ) => any = any> {
    expectedResult: PromiseReturnType< ReturnType< LogicFunctionType > >;
    inParams: Parameters< LogicFunctionType >;
}

type PromiseReturnType<T> = T extends Promise<infer R> ? R : any;
