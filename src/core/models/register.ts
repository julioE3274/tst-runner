import { IRegister } from "../Interfaces/iRegister";

export class EventRegister implements IRegister {

    private events = [];
    private static singletonInstance: EventRegister;

    constructor() {
        EventRegister.singletonInstance = this;
    }

    static instance() {
        if ( EventRegister.singletonInstance !== undefined && EventRegister.singletonInstance !== null ) {
            return EventRegister.singletonInstance;
        }
        return new EventRegister();
    }

    success(message, ...data ){
        console.log('\x1b[36m%s\x1b[0m', message, data, '\x1b[0m');
    };
    warn(message, ...data  ){
        console.log('\x1b[33m%s\x1b[0m', message, data, '\x1b[0m');
    };
    info(message, ...data  ){
        console.log('\x1b[34m%s\x1b[0m', message, data, '\x1b[0m');
    };
    error(message, ...data  ){
        console.log('\x1b[31m%s\x1b[0m', message, data, '\x1b[0m');
    };

}
