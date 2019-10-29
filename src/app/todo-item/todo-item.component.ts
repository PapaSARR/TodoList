import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TodoItemData} from "../dataTypes/TodoItemData";
import {TodoService} from "../todo.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {
  /**On récupère la todoItem passée depuis la composante mère**/
  @Input()
  private data: TodoItemData;

  /**Edition du label**/
  labelChanging: boolean;

  /**On injecte le service TodoService**/
  constructor(private todoService: TodoService) {
    this.labelChanging = false;
  }

  ngOnInit() {
  }

  /**On récupère le label du todoItem **/
  get label(){
    return this.data.label;
  }

  /**On récupère l'état du todoItem (fait ou pas fait) **/
  get isDone(){
    return this.data.isDone;
  }

  /**On change l'état du todoItem **/
  itemDone(item: TodoItemData, done: boolean){
    this.todoService.setItemsDone(done, item);
  }

  /**Suppression du todoItem**/
  removeItem(data: TodoItemData) {
    this.todoService.removeItems(data);
  }

  /**On change le label du todoItem **/
  itemLabel(item: TodoItemData, label: string){
    this.todoService.setItemsLabel(label, item);
    this.labelChanging = false;
  }
  /**Passe l'édition du label à true**/
  edit(){
    this.labelChanging = true;
  }
}
