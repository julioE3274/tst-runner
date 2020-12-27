import { TestCase, IInstanceTestCase } from "../../..";

export class SomeTestCase extends TestCase {

    instances: IInstanceTestCase<typeof SomeTestCase['prototype']['logic']>[] = [
        { expectedResult: false, inParams: [true, 83,'testing string param'] },
        { expectedResult: false, inParams: [false, -48,'tested'] },
        { expectedResult: true, inParams: [true] },
        { expectedResult: null, inParams: [] },
    ];

    protected async logic(returnValue = false, numberParam = 0, stringParam = 'test'){
        console.log('returnValue => ', returnValue, ' numberParam => ', numberParam, ' stringParam => ', stringParam);

        const milliseconds = Math.random() * 4000; // max 4s

        await new Promise( resolve => setTimeout(() => resolve(null), milliseconds ) );

        return returnValue;
    }

}
