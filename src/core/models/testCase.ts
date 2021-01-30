import { IInstanceTestCase, ITestCase } from "../interfaces/iTestCase";
import { LogicArgsType } from "../types/logicArgs.type";
import { LogicReturnType } from "../types/logicReturn.type";
import { createUUID } from "../utils/util";
import { EventRegister } from "./register";

export abstract class TestCase<T = any> implements ITestCase {

	readonly testCaseName: string = this.constructor.name;
	readonly uuid = createUUID();
	abstract instances: IInstanceTestCase<T>[];
	result: LogicReturnType<T>;
	success: boolean;
	requeredTestCases: TestCase[] = [];
	requeredAsyncInstances: boolean = null;
	requeredPostRunTestCases: TestCase[] = [];
	requeredPostRunAsyncInstances: boolean = null;

	constructor() {
	}

	protected abstract logic(...inParams: LogicArgsType<T>): Promise<LogicReturnType<T>>;

	/**
	 * Returns a IInstanceTestCase<T> with logic function result.
	 * @param  instance it must have all parameters of logic() and the expected result.
	 */
	async run(instance: IInstanceTestCase<T>) {
		instance.uuid = instance.uuid === null || instance.uuid === undefined ? createUUID() : instance.uuid;
		EventRegister.instance().info( `Starting ${this.testCaseName}`, instance );
		await Promise.all( this.requeredTestCases.map( async testCase => await testCase.runAllInstances(testCase.requeredAsyncInstances) ) );
		const result = await this.logic(...instance.inParams);
		instance.result = this.result = result;
		instance.success = this.success = result === instance.expectedResult;
		if (instance.success) {
			EventRegister.instance().success( `Successfully ${this.testCaseName}`, instance );
		} else {
			EventRegister.instance().error( `Error ${this.testCaseName}`, instance );
		}
		await Promise.all( this.requeredPostRunTestCases.map( async testCase => await testCase.runAllInstances(testCase.requeredPostRunAsyncInstances) ) );
		return instance;
	}

	/**
	 * Run all instances by default synchronously
	 * @param  {} async=null
	 */
	async runAllInstances(async: boolean = null) {
		if ( async ) {
			const promises = this.instances.map( instance => this.run( instance ) );
			await Promise.all( promises );
		} else {
			for (let i = 0; i < this.instances.length; i++) {
				await this.run( this.instances[i] );
			}
		}
	}

}
