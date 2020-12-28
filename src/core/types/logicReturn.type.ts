
export type LogicReturnType<C> = C extends { logic: infer F }
    ? PromiseReturnType<RetType<F>>
    : any;


type RetType<T> = T extends (...args: any) => infer R ? R : any

type PromiseReturnType<T> = T extends Promise<infer R> ? R : any;
