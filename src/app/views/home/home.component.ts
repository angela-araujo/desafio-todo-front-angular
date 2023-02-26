import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

import { Task } from './../../models/Task.model';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { TaskService } from './../../services/task.service';

const TASK_DATA: Task[] = [
  { id: 1, title: 'Tarefa 1', description: 'Fazer a tarefa 1', startAt: '2023-02-05T00:00:00Z', finishAt: '2023-02-06T00:00:00Z', deadLine: '2023-02-10T00:00:00Z', personId: 1 },
  { id: 2, title: 'Tarefa 2', description: 'Fazer a tarefa 2', startAt: '2023-02-05T00:00:00Z', finishAt: '2023-02-06T00:00:00Z', deadLine: '2023-02-10T00:00:00Z', personId: 1 },
  { id: 3, title: 'Tarefa 3', description: 'Fazer a tarefa 3', startAt: '2023-02-05T00:00:00Z', finishAt: '2023-02-06T00:00:00Z', deadLine: '2023-02-10T00:00:00Z', personId: 1 },
  { id: 4, title: 'Tarefa 4', description: 'Fazer a tarefa 4', startAt: '2023-02-05T00:00:00Z', finishAt: '2023-02-06T00:00:00Z', deadLine: '2023-02-10T00:00:00Z', personId: 1 },
  { id: 5, title: 'Tarefa 5', description: 'Fazer a tarefa 5', startAt: '2023-02-05T00:00:00Z', finishAt: '2023-02-06T00:00:00Z', deadLine: '2023-02-10T00:00:00Z', personId: 1 },
  { id: 6, title: 'Tarefa 6', description: 'Fazer a tarefa 6', startAt: '2023-02-05T00:00:00Z', finishAt: '2023-02-06T00:00:00Z', deadLine: '2023-02-10T00:00:00Z', personId: 1 },
  { id: 7, title: 'Tarefa 7', description: 'Fazer a tarefa 7', startAt: '2023-02-05T00:00:00Z', finishAt: '2023-02-06T00:00:00Z', deadLine: '2023-02-10T00:00:00Z', personId: 1 },
  { id: 8, title: 'Tarefa 8', description: 'Fazer a tarefa 8', startAt: '2023-02-05T00:00:00Z', finishAt: '2023-02-06T00:00:00Z', deadLine: '2023-02-10T00:00:00Z', personId: 1 },
  { id: 9, title: 'Tarefa 9', description: 'Fazer a tarefa 9', startAt: '2023-02-05T00:00:00Z', finishAt: '2023-02-06T00:00:00Z', deadLine: '2023-02-10T00:00:00Z', personId: 1 },
  { id: 10, title: 'Tarefa 10', description: 'Fazer a tarefa 10', startAt: '2023-02-05T00:00:00Z', finishAt: '2023-02-06T00:00:00Z', deadLine: '2023-02-10T00:00:00Z', personId: 1 },
  { id: 11, title: 'Tarefa 11', description: 'Fazer a tarefa 11', startAt: '2023-02-05T00:00:00Z', finishAt: '2023-02-06T00:00:00Z', deadLine: '2023-02-10T00:00:00Z', personId: 1 },
];

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
  dataSource!: Task[];

  constructor(
    public dialog: MatDialog,
    public taskService: TaskService
  ) {
    this.taskService.getTasks()
      .subscribe((data: Task[]) => {
        this.dataSource = data
      });

  }

  openDialog(dataTask: Task | null): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: dataTask === null ? {
        id: null,
        title: '',
        description: '',
        startAt: '',
        finishAt: '',
        deadLine: '',
        personId: ''
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
        this.dataSource.push(result);
        this.table.renderRows();
      }
    });
  }

  editTask(dataTask: Task): void {
    this.openDialog(dataTask);
  }

  deleteTask(id: number): void {
    this.dataSource = this.dataSource.filter(p => p.id !== id);
  }

}
