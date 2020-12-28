
export type LogicArgsType<C> = C extends { logic: infer F }
    ? ArgsType<F>
    : any;

type ArgsType<T> = T extends (...args: infer P) => any ? P : never
