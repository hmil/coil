import { ActionHandler, makeReducer } from 'cl/utils/common/redux/Reducer';
import { Map } from 'immutable';

import { IWorkbenchState } from './IWorkbenchState';
import {
    CheckToDoAction,
    CreateToDoAction,
    RemoveAllCheckedToDosAction,
    RemoveToDoAction,
    UpdatePendingToDoTextAction,
} from './WorkbenchActions';

export const workbenchRootReducer = makeReducer<IWorkbenchState>([

    new ActionHandler(CreateToDoAction, (s, action) => (
        s.withTodoItems(
            s.todoItems.set(action.payload.id, s.pendingTodo.withId(action.payload.id)))
        .withPendingTodo(
            s.pendingTodo.withText(''))
    )),

    new ActionHandler(UpdatePendingToDoTextAction, (s, action) => (
        s.withPendingTodo(s.pendingTodo.withText(action.payload))
    )),

    new ActionHandler(CheckToDoAction, (s, action) => (
        ((lastTodo) => lastTodo
            ? s.withTodoItems(
                s.todoItems.set(action.payload.id,
                    lastTodo.withChecked(!lastTodo.checked)))
            : s
        ))(s.todoItems.get(action.payload.id)
    )),

    new ActionHandler(RemoveToDoAction, (s, action) => (
        s.withTodoItems(s.todoItems.remove(action.payload.id))
    )),

    new ActionHandler(RemoveAllCheckedToDosAction, (s, _action) => (
        s.withTodoItems(
            Map(s.todoItems.filter(t => t != null && !t.checked))
        )
    ))
]);
