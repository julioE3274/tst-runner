import { IInstanceTestCase, ITestCase } from "../interfaces/iTestCase";
import { LogicArgsType } from "../types/logicArgs.type";
import { LogicReturnType } from "../types/logicReturn.type";
import { EventRegister } from "./register";

export abstract class TestCase<T = any> implements ITestCase {

	testCaseName: string;
	abstract instances: IInstanceTestCase<T>[];

	constructor() {
		this.testCaseName = this.constructor.name;
	}

	protected abstract logic(...inParams: LogicArgsType<T>): Promise<any>;

	/**
	 * Returns true if expectedResult is equal to logic() result
	 * @param  expectedResult
	 * @param  ...inParams it must be all parameters of logic()
	 */
	async run(expectedResult: LogicReturnType<T>, ...inParams: LogicArgsType<T>) {
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

	/**
	 * Run all instances by default asynchronously
	 * @param  {} async=true
	 */
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
