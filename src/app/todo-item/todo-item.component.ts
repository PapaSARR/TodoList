import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild("newTextInput", {static: false}) private inputLabel: ElementRef;
  /**Etat de l'édition du label initialisé à false**/
  private _editing: boolean = false;

  /**On injecte le service TodoService**/
  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
  }

  /**On récupère le label de la todoItem **/
  get label(): string{
    return this.data.label;
  }

  /**On change le label de la todoItem **/
  set label(lab: string) {
    this.todoService.setItemsLabel(lab, this.data);
  }

  /**On récupère l'état de la todoItem (fait ou pas fait) **/
  get isDone(): boolean{
    return this.data.isDone;
  }

  /**On change l'état de la todoItem **/
  set isDone(done: boolean) {
    this.todoService.setItemsDone(done, this.data);
  }

  /**On récupère l'état de l'édition du label **/
  get editing(): boolean {
    return this._editing;
  }

  /**On change l'état de l'édition du label **/
  set editing(e: boolean) {
    this._editing = e;
    requestAnimationFrame(() => this.inputLabel.nativeElement.focus());
  }

  /**Suppression de la todoItem**/
  remove(): void {
    this.todoService.removeItems(this.data);
  }

}
