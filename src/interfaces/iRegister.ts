export interface IRegister {

    success: (testCase: string, data ) => void;
    warn: (testCase: string, data ) => void;
    info: (testCase: string, data ) => void;
    error: (testCase: string, data ) => void;

}
