import { SomeTestCase } from "../src/examples/typescript/some.tst";

describe("Implementing some test case", () => {

    let someTestCase: SomeTestCase;

    beforeEach( () => {
        someTestCase = new SomeTestCase();
    });

    it("Run with expectedResult as true and returnParam as true", async () => {

        const result = await someTestCase.run( {expectedResult: true, inParams: [true] });
        expect( result.success ).toBeTrue();

    });

    it("Run with expectedResult as true and returnParam as false", async () => {

        const result = await someTestCase.run( {expectedResult: true, inParams: [false] } );
        expect( result.success ).toBeFalse();

    });

    describe("#resume", () => {
        it("should not throw an exception if run all instances", () => {

            expect( async () => {
                await someTestCase.runAllInstances();
            }).not.toThrowError("Something is wrong");

        });
    });
});
