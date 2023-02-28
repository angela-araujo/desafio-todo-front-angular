import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { TaskService } from './../../services/task.service';
import { ITask } from './../../models/Task.model';
import { IPerson } from 'src/app/models/Person.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [TaskService]
})
export class HomeComponent {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'title', 'description', 'startAt', 'finishAt', 'deadLine', 'personId', 'actions'];
  dataSource!: ITask[];
  errorMessage: string = '';

  constructor(
    public dialog: MatDialog,
    public taskService: TaskService
  ) {
    this.taskService.getTasks()
      .subscribe((data: ITask[]) => {
        this.dataSource = data
      });
  }

  openDialog(dataTask: ITask | null): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: dataTask === null ? {
        id: null,
        title: null,
        description: null,
        startAt: null,
        finishAt: null,
        deadLine: null,
        personId: null
      } : {
        id: dataTask.id,
        title: dataTask.title,
        description: dataTask.description,
        startAt: dataTask.startAt,
        finishAt: dataTask.finishAt,
        deadLine: dataTask.deadLine,
        personId: dataTask.personId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.dataSource.map(p => p.id).includes(result.id)) {
          this.taskService.editTask(result.id, result)
            .subscribe(
              (data: ITask) => {
                const index = this.dataSource.findIndex(p => p.id == data.id);
                this.dataSource[index] = data;
                this.table.renderRows();
              });
        } else {
          this.taskService.createTask(result)
            .subscribe((data: ITask) => {
              console.log('subscribe createTask:', data);
              if (data !== null)
                this.dataSource.push(data);
              this.table.renderRows();
            },
            (error) => {
              // this.errorMessage = error
              console.log('error createTask service: ', error);
              
            });
        }
      }
    });
  }

  editTask(dataTask: ITask): void {
    this.openDialog(dataTask);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.dataSource = this.dataSource.filter(p => p.id !== id);
    })
  }

}
