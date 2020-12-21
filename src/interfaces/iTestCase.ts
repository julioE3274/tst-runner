export interface ITestCase {

    testCaseName: string;
    instances: IInstanceTestCase[];

    run: ( expectedResult: any, ... inParams: any ) => Promise<boolean>;

}

export interface IInstanceTestCase {
    expectedResult: any;
    inParams: { [ param: string ]: any };
}
