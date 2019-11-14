import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {TodoListData} from '../dataTypes/TodoListData';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  private titre: string;
  @Input()
  private data: TodoListData;
  @ViewChild("newTodoInput", {static: false}) newTodoInput: ElementRef;
  private filter: string;


  constructor(private todoService: TodoService) {
    todoService.getTodoListDataObserver().subscribe(tdl => this.data = tdl); /**Appel du service pour récupérer le TodoList**/
    this.titre = this.data.label;  /**Titre du TodoList**/
  }

  ngOnInit() {
  }

  /**Récupère le tableau des todoItems**/
  get items(): TodoItemData[] {
    return this.data ? this.data.items : [];
  }

  /**Récupère le nombre des todoItems actives**/
  get itemsRestantes(): number {
    return this.items.filter(item => !item.isDone).length;
    /*return this.items.reduce((acc, item) => acc + (item.isDone ? 0 : 1), 0);*/
  }

  /**Ajout d'une todoItem**/
  appendItem(label: string): void{
    if(label === ''){
      return;
    }
    this.todoService.appendItems(
      {label, isDone: false}
    );
  }

  /**On change l'état de la todoItem **/
  itemDone(item: TodoItemData, done: boolean): void{
    this.todoService.setItemsDone(done, item);
  }

  /**Renvoie true si tous les todoItems sont faites **/
  isAllDone(): boolean {
    return this.items.every( it => it.isDone );
  }

  /**S'il existe des todoItems actives dans la liste, on change leurs états à complétées**/
  toggleAllDone(): void {
    const done = !this.isAllDone();
    this.todoService.setItemsDone(done, ...this.items);
  }

  /**On change le label de la todoItem **/
  itemLabel(item: TodoItemData, label: string): void{
    this.todoService.setItemsLabel(label, item);
  }

  /**Suppression de la todoItem**/
  removeItem(item: TodoItemData): void{
    this.todoService.removeItems(item);
  }

  /**Liste des todoItems avec filtrage**/
  todosFiltered(): TodoItemData[]{
    if(this.filter === 'all'){
      return this.items;
    }else if(this.filter === 'active'){
      return this.items.filter(item => !item.isDone);
    }else if(this.filter === 'completed'){
      return this.items.filter(item => item.isDone);
    }
    return this.items;
  }

  /**Vérifie s'il existe au moins une todoItem déjà faite dans la liste**/
  setUpClearbutton(): boolean{
  return this.items.filter(item => item.isDone).length > 0;
  }

  /**Supprime les todoItems complétées de la liste**/
  clearCompleted(): void{
    this.data.items = this.items.filter(item => !item.isDone);
  }
}
