import { AudioEngineState } from 'cl/platform/audio/AudioEngineState';

import { Map } from 'immutable';

export class TodoItem {
    constructor(
            public readonly id: string = '',
            public readonly text: string = '',
            public readonly checked: boolean = false) {
    }

    public withId(id: string): TodoItem {
        return new TodoItem(id, this.text, this.checked);
    }

    public withText(text: string): TodoItem {
        return new TodoItem(this.id, text, this.checked);
    }

    public withChecked(checked: boolean): TodoItem {
        return new TodoItem(this.id, this.text, checked);
    }
}

export class WorkbenchState {
    constructor(
            public readonly audioEngine: AudioEngineState = new AudioEngineState(),
            public readonly pendingTodo: TodoItem = new TodoItem(),
            public readonly todoItems: Map<string, TodoItem> = Map()) { }

    withAudioEngine(audioEngine: AudioEngineState): WorkbenchState {
        return new WorkbenchState(audioEngine, this.pendingTodo, this.todoItems);
    }

    withTodoItems(todoItems: Map<string, TodoItem>): WorkbenchState {
        return new WorkbenchState(this.audioEngine, this.pendingTodo, todoItems);
    }

    withPendingTodo(pendingTodo: TodoItem) {
        return new WorkbenchState(this.audioEngine, pendingTodo, this.todoItems);
    }
}
