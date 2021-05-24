import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DialogOverviewDelete {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewDelete>
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}