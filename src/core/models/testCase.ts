import { IInstanceTestCase, ITestCase } from "../interfaces/iTestCase";
import { LogicArgsType } from "../types/logicArgs.type";
import { LogicReturnType } from "../types/logicReturn.type";
import { createUUID } from "../utils/util";
import { EventRegister } from "./register";

export abstract class TestCase<T = any> implements ITestCase {

	testCaseName: string;
	readonly uuid = createUUID();
	abstract instances: IInstanceTestCase<T>[];

	constructor() {
		this.testCaseName = this.constructor.name;
	}

	protected abstract logic(...inParams: LogicArgsType<T>): Promise<LogicReturnType<T>>;

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

	async run2(instance: IInstanceTestCase<T>) {
		instance.uuid = instance.uuid === null || instance.uuid === undefined ? createUUID() : instance.uuid;
		EventRegister.instance().info( `Starting ${this.testCaseName}`, instance );
		const result = await this.logic(...instance.inParams);
		instance.result = result;
		instance.success = result === instance.expectedResult;
		if (instance.success) {
			EventRegister.instance().success( `Successfully ${this.testCaseName}`, instance );
		} else {
			EventRegister.instance().error( `Error ${this.testCaseName}`, instance );
		}
		return instance;
	}

	async runAllInstances2(async = true) {
		if ( async ) {
			const promises = this.instances.map( instance => this.run2( instance ) );
			await Promise.all( promises );
		} else {
			for (let i = 0; i < this.instances.length; i++) {
				await this.run2( this.instances[i] );
			}
		}
	}

}
