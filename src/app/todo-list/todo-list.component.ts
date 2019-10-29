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

  /**Récupère le nombre des todoItems pas encore faits**/
  get itemsRestantes(): number {
    return this.items.reduce((acc, item) => acc + (item.isDone ? 0 : 1), 0);
  }

  /**Ajout d'un todoItem**/
  appendItem(label: string){
    this.todoService.appendItems(
      {label, isDone: false}
    );
  }

  /**On change l'état du todoItem **/
  itemDone(item: TodoItemData, done: boolean){
    this.todoService.setItemsDone(done, item);
  }

  /**On change l'état des todoItems **/
  itemsDone(items: TodoItemData[], done: boolean){
    this.todoService.setItemsDone(done, ...items);
  }
  /**On change le label du todoItem **/
  itemLabel(item: TodoItemData, label: string){
    this.todoService.setItemsLabel(label, item);
  }

  /**Suppression du todoItem**/
  removeItem(item: TodoItemData){
    this.todoService.removeItems(item);
  }
}
