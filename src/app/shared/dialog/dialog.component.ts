import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/models/Task.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  task!: Task;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: Task,
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
