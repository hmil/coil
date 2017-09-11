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
 * Wrapper for a reducer function aimed to handle a given action type.
 */
export class ActionHandler<S, P, A extends IAction<P>> {

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
 * Action handler lookup table, indexed by action type.
 */
interface IActionFilter<S> {
    [type: string]: ((s: S, a: IAction<any>) => S) | undefined;
}

/**
 * Creates a reducer by combining a bunch of action handlers.
 *
 * @param defs action handlers to use in this reducer
 */
export function makeReducer<S>(
            defs: ActionHandler<S, any, any>[])
            : (s: S, a: IStandardAction<any>) => S {

    const filter: IActionFilter<S> = {};
    defs.forEach((def) => filter[def.type.name] = def.r);

    return (s: S, a: IStandardAction<any>) => {
        const reducer = filter[a.type];
        if (reducer) {
            return reducer(s, a);
        }
        return s;
    };
}
