import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
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
  private filter: string;


  constructor(private todoService: TodoService) {
    todoService.getTodoListDataObserver().subscribe(tdl => this.data = tdl); /**Appel du service pour récupérer le TodoList**/
    this.titre = this.data.label;  /**Titre du TodoList**/
  }

  ngOnInit() {
  }

  /**Récupère le titre du TodoList**/
  get label(): string {
    return this.data ? this.data.label : '';
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

  /**On change l'état des todoItems **/
  itemsDone(items: TodoItemData[], done: boolean): void{
    this.todoService.setItemsDone(done, ...items);
  }
  /**On change le label de la todoItem **/
  itemLabel(item: TodoItemData, label: string): void{
    this.todoService.setItemsLabel(label, item);
  }

  /**Suppression de la todoItem**/
  removeItem(item: TodoItemData): void{
    this.todoService.removeItems(item);
  }

  /**Passe l'édition du label à true**/
  edit(item): void{
    item.editing = true;
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
