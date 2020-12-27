import { IInstanceTestCase, ITestCase } from "../interfaces/iTestCase";
import { EventRegister } from "./register";

export abstract class TestCase implements ITestCase {

	testCaseName: string;
	abstract instances: IInstanceTestCase[];

	constructor() {
		this.testCaseName = this.constructor.name;
	}

	protected abstract logic(...inParams: any): Promise<any>;

	async run(expectedResult: any, ...inParams: any) {
		EventRegister.instance().info( `Starting ${this.testCaseName}`, inParams, expectedResult );
		const result = await this.logic(...inParams);
		const success = result === expectedResult;
		if (success) {
			EventRegister.instance().success( `Successfully ${this.testCaseName}`, inParams, expectedResult  );
		} else {
			EventRegister.instance().error( `Error ${this.testCaseName}`, inParams, expectedResult );
		}
		return success;
	};

	async runAllInstances(async = true) {
		if ( async ) {
			const promises = this.instances.map( instance => this.run( instance.expectedResult, ...instance.inParams ) );
			await Promise.all( promises );
		} else {
			for (let i = 0; i < this.instances.length; i++) {
				await this.run(this.instances[i].expectedResult, ...this.instances[i].inParams);
			}
		}
	}

}
