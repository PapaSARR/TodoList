import { Injectable } from '@angular/core';
import {TodoListData} from './dataTypes/TodoListData';
import {Observable, BehaviorSubject} from 'rxjs';
import {TodoItemData} from './dataTypes/TodoItemData';

@Injectable()
export class TodoService {
  private todoListSubject = new BehaviorSubject<TodoListData>( {label: 'TodoList', items: []} );
  private _undo: TodoItemData[][] = []; /**Tableau des undos**/
  private _redo: TodoItemData[][] = []; /**Tableau des redos**/

  constructor() {
    this.todoListSubject.getValue().items = this.getItems(); /**On récupère les items stockés dans le localStorage**/
    this._undo = this.getUndo(); /**On récupére les undos stockés dans le localStorage**/
    this._redo = this.getRedo(); /**On récupère les redos du localStorage**/
  }

  getTodoListDataObserver(): Observable<TodoListData> {
    return this.todoListSubject.asObservable();
  }

  setItemsLabel(label: string, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label, isDone: I.isDone}) )
    });
    this.setLocalStorageItems(this.todoListSubject.getValue().items); /**On met à jour le tableau d'items dans le localStorage**/
    this._undo.push(tdl.items); /**On sauvegarde la liste d'items dans le tableau undo**/
    this.setLocalStorageUndo(this._undo); /**Et on met à jour le tableau undo stocké dans le localStorage**/
  }

  setItemsDone(isDone: boolean, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label: I.label, isDone}) )
    });
    this.setLocalStorageItems(this.todoListSubject.getValue().items);
    this._undo.push(tdl.items);
    this.setLocalStorageUndo(this._undo);
  }

  appendItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: [...tdl.items, ...items]
    });
    this.setLocalStorageItems(this.todoListSubject.getValue().items);
    this._undo.push(tdl.items);
    this.setLocalStorageUndo(this._undo);
  }

  removeItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: tdl.items.filter( I => items.indexOf(I) === -1 )
    });
    this.setLocalStorageItems(this.todoListSubject.getValue().items);
    this._undo.push(tdl.items);
    this.setLocalStorageUndo(this._undo);
  }

  /**Getter && Setter du tableau undo**/
  get undo(){
    return this._undo;
  }
  set undo(t: TodoItemData[][]){
   this._undo = t;
  }

  /**Getter && Setter du tableau redo**/
  get redo(){
    return this._redo;
  }

  set redo(t: TodoItemData[][]){
    this._redo = t;
  }

  /**Pour récupérer la liste d'items depuis le localStorage**/
  getItems(): TodoItemData[]{
    const localStorageItem = JSON.parse(localStorage.getItem('items'));
    return localStorageItem == null ? [] : localStorageItem.items;
  }

  /**Mis à jour de la liste d'items dans le localStorage**/
  setLocalStorageItems(items: TodoItemData[]): void{
    localStorage.setItem('items', JSON.stringify({items: items}));
  }

  /**Traitement analogue pour undo et redo**/

  getUndo(): TodoItemData[][]{
    const localStorageUndo = JSON.parse(localStorage.getItem('undo'));
    return localStorageUndo == null ? [] : localStorageUndo.undo;
  }

  setLocalStorageUndo(undo: TodoItemData[][]): void{
    localStorage.setItem('undo', JSON.stringify({undo: undo}));
  }

  getRedo(): TodoItemData[][]{
    const localStorageRedo = JSON.parse(localStorage.getItem('redo'));
    return localStorageRedo == null ? [] : localStorageRedo.redo;
  }

  setLocalStorageRedo(redo: TodoItemData[][]): void{
    localStorage.setItem('redo', JSON.stringify({redo: redo}));
  }
}
