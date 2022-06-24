import { Component } from '@angular/core';
import { Task } from './task/task';
import { CdkDragDrop, DropListRef, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { TaskDialogData, TaskDialogResult } from './task-dialog/task-dialog.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kanban-fire';
  todo: Task[] = [
    {
      title: 'Buy milk', 
      description: 'Go to store & buy milk'
    },
    {
      title: 'Create Kanban app', 
      description: 'Using Firebase and Angular create a kanban app!'
    }
  ];
  inProgress: Task[]=[];
  done: Task[]=[];


  constructor(private dialog: MatDialog){

  }
  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      }
    });
    dialogRef.afterClosed()
      .subscribe((result: TaskDialogResult) => this.todo.push(result.task));
  }

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    
}

  drop(event: CdkDragDrop<Task[] | any>): void {
    if(event.previousContainer === event.container){
      return;
    }
    if(!event.container.data || !event.previousContainer.data){
      return;
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }


}


