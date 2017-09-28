import { IAction, IStandardAction } from './Action';

/**
 * Constructor for an action.
 */
export interface IActionConstructor<P, A extends IAction<P>> {
    new (): A;
}

/**
 * Pure reducer function for IActions as defined by redux.
 */
export interface IReducer<S, P, A extends IAction<P>> {
    (s: S, a: A): S;
}

/**
 * Internal interface used to define what makeReducer accepts.
 */
interface IReducerDefinition<S, P, A extends IAction<P>> {
    type: {
        name: string;
    };
    r: IReducer<S, P, A>;
}

/**
 * Wrapper for a reducer function aimed to handle a given action type.
 */
export class ActionHandler<S, P, A extends IAction<P>> implements IReducerDefinition<S, P, A> {
    /**
     * Creates a reducer handling a given action type.
     *
     * @param type The type of actions to handle
     * @param r The reducer pure function
     */
    constructor(
            public type: IActionConstructor<P, A>,
            public r: IReducer<S, P, A>) { }
}

/**
 * Wraps a reducer such that it can be composed with other reducers and action handlers
 * into a higher level reducer.
 */
export class PartialReducer<SB, SR> implements IReducerDefinition<SB, any, IAction<any>> {
    constructor(
            private down: (sb: SB) => SR,
            private up: (sb: SB, sr: SR) => SB,
            private reducer: IReducer<SR, any, IAction<any>>) {
    }

    public type = { name: '*' };

    public r = (s: SB, a: IAction<any>): SB => this.up(s, this.reducer(this.down(s), a));
}

/**
 * Action handler lookup table, indexed by action type.
 */
interface IActionFilter<S> {
    [type: string]: Array<((s: S, a: IAction<any>) => S)> | undefined;
    '*': Array<((s: S, a: IAction<any>) => S)>;
}

/**
 * Creates a reducer by combining a bunch of action handlers.
 *
 * @param defs action handlers to use in this reducer
 */
export function makeReducer<S>(
            defs: IReducerDefinition<S, any, any>[])
            : IReducer<S, any, IStandardAction<any>> {

    const actionFilter: IActionFilter<S> = {
        '*': []
    };

    defs.forEach((def) => {
        let bucket = actionFilter[def.type.name];
        if (bucket == null) {
            bucket = actionFilter[def.type.name] = [];
        }
        bucket.push(def.r);
    });

    return (s: S, a: IStandardAction<any>) => {
        return actionFilter['*']
                .concat(actionFilter[a.type] || [])
                .reduce((acc, r) => r(acc, a), s);
    };
}
