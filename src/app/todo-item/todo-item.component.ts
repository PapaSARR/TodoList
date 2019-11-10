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
  /**On récupère la todoItem passée depuis le composant père**/
  @Input()
  private data: TodoItemData;
  /**Etat de l'édition du label**/
  editing: boolean;

  /**On injecte le service TodoService**/
  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
  }

  /**On récupère le label de la todoItem **/
  get label(): string{
    return this.data.label;
  }

  /**On récupère l'état de la todoItem (fait ou pas fait) **/
  get isDone(): boolean{
    return this.data.isDone;
  }

  /**On change l'état de la todoItem **/
  itemDone(item: TodoItemData, done: boolean): void{
    this.todoService.setItemsDone(done, item);
  }

  /**Suppression de la todoItem**/
  removeItem(data: TodoItemData): void {
    this.todoService.removeItems(data);
  }

  /**On change le label de la todoItem **/
  itemLabel(item: TodoItemData, label: string): void{
    this.todoService.setItemsLabel(label, item);
  }
}
