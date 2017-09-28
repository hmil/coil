import { ActionHandler, makeReducer } from 'cl/base/common/redux/Reducer';
import { Map } from 'immutable';

import { WorkbenchState } from './IWorkbenchState';
import {
    CheckToDoAction,
    CreateToDoAction,
    RemoveAllCheckedToDosAction,
    RemoveToDoAction,
    UpdatePendingToDoTextAction,
} from './WorkbenchActions';

/*
 * This module is hot-reloadable. It may be executed multiple times
 * during the lifetime of the app in development and therefore it should
 * either be stateless or provide an easy way to migrate its state in between
 * hot reloads.
 */

export const workbenchRootReducer = makeReducer<WorkbenchState>([

    new ActionHandler(CreateToDoAction, (s, action) => (
        s.withTodoItems(
            s.todoItems.set(action.payload.id, s.pendingTodo.withId(action.payload.id)))
        .withPendingTodo(
            s.pendingTodo.withText(''))
    )),

    new ActionHandler(UpdatePendingToDoTextAction, (s, action) => (
        s.withPendingTodo(s.pendingTodo.withText(action.payload))
    )),

    new ActionHandler(CheckToDoAction, (s, action) => {
        const lastTodo = s.todoItems.get(action.payload.id);
        return lastTodo
            ? s.withTodoItems(
                s.todoItems.set(action.payload.id,
                    lastTodo.withChecked(!lastTodo.checked)))
            : s;
    }),

    new ActionHandler(RemoveToDoAction, (s, action) => (
        s.withTodoItems(s.todoItems.remove(action.payload.id))
    )),

    new ActionHandler(RemoveAllCheckedToDosAction, (s, _action) => (
        s.withTodoItems(
            Map(s.todoItems.filter(t => t != null && !t.checked))
        )
    )),
]);
