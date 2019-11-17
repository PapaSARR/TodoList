import { Injectable } from '@angular/core';
import {TodoListData} from './dataTypes/TodoListData';
import {Observable, BehaviorSubject} from 'rxjs';
import {TodoItemData} from './dataTypes/TodoItemData';
import {TodoItemComponent} from './todo-item/todo-item.component';

@Injectable()
export class TodoService {
  private todoListSubject = new BehaviorSubject<TodoListData>( {label: 'TodoList', items: []} );
  private _undo: TodoItemData[][] = [];
  private _redo : TodoItemData[][] = [];

  constructor() { }

  getTodoListDataObserver(): Observable<TodoListData> {
    return this.todoListSubject.asObservable();
  }

  setItemsLabel(label: string, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label, isDone: I.isDone}) )
    });
    this._undo.push(tdl.items);
  }

  setItemsDone(isDone: boolean, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label: I.label, isDone}) )
    });
    this._undo.push(tdl.items);
  }

  appendItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: [...tdl.items, ...items]
    });
    this._undo.push(tdl.items);
  }

  removeItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: tdl.items.filter( I => items.indexOf(I) === -1 )
    });
    this._undo.push(tdl.items);
  }

  get undo(){
    return this._undo;
  }
  set undo(t: TodoItemData[][]){
    this._undo = t;
  }

  get redo(){
    return this._redo;
  }

  set redo(t: TodoItemData[][]){
    this._redo = t;
  }

}
