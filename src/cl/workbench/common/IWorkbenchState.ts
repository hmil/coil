
import { Map } from 'immutable';

export class ITodoItem {
    constructor(
            public readonly id: string = '',
            public readonly text: string = '',
            public readonly checked: boolean = false) {
    }

    public withId(id: string): ITodoItem {
        return new ITodoItem(id, this.text, this.checked);
    }

    public withText(text: string): ITodoItem {
        return new ITodoItem(this.id, text, this.checked);
    }

    public withChecked(checked: boolean): ITodoItem {
        return new ITodoItem(this.id, this.text, checked);
    }
}

export class IWorkbenchState {
    constructor(
            public readonly pendingTodo: ITodoItem = new ITodoItem(),
            public readonly todoItems: Map<string, ITodoItem> = Map()) { }

    withTodoItems(todoItems: Map<string, ITodoItem>): IWorkbenchState {
        return new IWorkbenchState(this.pendingTodo, todoItems);
    }

    withPendingTodo(pendingTodo: ITodoItem) {
        return new IWorkbenchState(pendingTodo, this.todoItems);
    }
}
