import { IPerson } from './../../models/Person.model';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITask } from 'src/app/models/Task.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  @ViewChild(MatDatepicker) 
  datepicker!: MatDatepicker<Date>;
  task!: ITask;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: ITask,
    public dialogRef: MatDialogRef<DialogComponent>
  ) { }

  ngOnInit(): void {
    console.log('ngOnInit data:', this.data)
    if (this.data.id !== null) {
      this.isChange = true;
    } else {
      this.isChange = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
