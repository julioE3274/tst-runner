import { TestCase, IInstanceTestCase } from "./../../";

class SomeTestCase extends TestCase {

    instances: IInstanceTestCase<typeof SomeTestCase['prototype']['logic']>[] = [
        { expectedResult: false, inParams: [] },
        { expectedResult: false, inParams: [false] },
        { expectedResult: true, inParams: [true] },
        { expectedResult: null, inParams: [null] },
    ];

    protected async logic(returnValue = false){

        const milliseconds = Math.random() * 4000; // max 4s

        await new Promise( resolve => setTimeout(() => resolve(null), milliseconds ) );

        return returnValue;
    }

}


const someTestCase = new SomeTestCase();
someTestCase.runAllInstances();
