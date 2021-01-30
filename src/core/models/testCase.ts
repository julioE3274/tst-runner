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
	 * Returns a IInstanceTestCase<T> with logic function result.
	 * @param  instance it must have all parameters of logic() and the expected result.
	 */
	async run(instance: IInstanceTestCase<T>) {
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

	/**
	 * Run all instances by default asynchronously
	 * @param  {} async=true
	 */
	async runAllInstances(async: boolean = true) {
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
