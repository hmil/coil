import * as Redux from 'redux';

/**
 * Untyped Flux Standard Action
 *
 * Because TypeScript is typesafe, not all internal APIs need the "type" attribute of flux actions.
 * However we still need to serialize the action in order to dispatch it, then we need a IStandardAction.
 */
export interface IAction<T_PAYLOAD> {
    namespace?: string;
    payload: T_PAYLOAD;
    error?: boolean;
}

/**
 * Interface for Flux Standard Actions
 *
 * Should follow the recommendation at https://github.com/acdlite/flux-standard-action
 */
export interface IStandardAction<T_PAYLOAD> extends IAction<T_PAYLOAD>, Redux.Action {
    type: string;
}

/**
 * An action must be a plain JavaScript object. However,
 * we want action handlers to be able to type-safely bind to actions.
 * Also, we need a function to create the action itself.
 *
 * This class unites all three aspects of an action under one symbol.
 * Namely, an ActionFactory:
 * - Defines the type of an action.
 * - Provides its implementation (factory function).
 * - Provides a symbol for type reconstruction.
 *
 * To use this class, create a sub-class with appropriate payload type
 * and define a pure function static method "create" with arbitrary arguments
 * to create an action.
 *
 * /!\ Clearly export the sub-class as a named symbol with a **unique name**.
 * If multiple ActionFactories share the same TypeScript symbol name, bad things
 * will happen.
 *
 * /!\ DO NOT, add additional instance properties to this class or its sub-classes
 * and DO NOT store state. ever.
 */
export class ActionFactory<T_PAYLOAD> implements IAction<T_PAYLOAD> {
    public type: string;
    public payload: T_PAYLOAD;

    /**
     * Takes an action without runtime type information and adds the runtime type
     * information such that the redux helpers can expose a type-safe API.
     *
     * @param untypedAction Action data without the "type" property.
     */
    protected static _create<P>(untypedAction: IAction<P>): IStandardAction<P> {
        return {
            ...untypedAction,
            type: this.name
        };
    }
}
