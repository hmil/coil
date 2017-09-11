import * as uuid from 'uuid/v1';

import { ActionFactory } from 'cl/utils/common/redux/Action';

export class UpdatePendingToDoTextAction extends ActionFactory<string> {
    static create(text: string) {
        return this._create({
            payload: text
        });
    }
}

class ToDoAction extends ActionFactory<{id: string}> { }

export class CreateToDoAction extends ToDoAction {
    static create() {
        return this._create({
            payload: {
                id: uuid()
            }
        });
    }
}

export class CheckToDoAction extends ToDoAction {
    static create(id: string) {
        return this._create({
            payload: {
                id: id
            }
        });
    }
}

export class RemoveToDoAction extends ToDoAction {
    static create(id: string) {
        return this._create({
            payload: {
                id: id
            }
        });
    }
}

export class RemoveAllCheckedToDosAction extends ActionFactory<undefined> {
    static create() {
        return this._create({ payload: void 0 });
    }
}
