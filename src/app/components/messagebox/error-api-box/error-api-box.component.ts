import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { APIResultModel } from '../../misc/APIResult.Model';


@Component({
  selector: 'app-error-api-box',
  templateUrl: './error-api-box.component.html',
  styleUrls: ['./error-api-box.component.scss']
})
export class ErrorApiBoxComponent implements OnInit {
  boxTitle: string;
  errorMessage: string;
  constructor(
    private dialogRef: MatDialogRef<ErrorApiBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: APIResultModel
  ) { }
  ngOnInit() {
    this.dialogRef.disableClose = true;
  }
  public closeDialog() {
    this.dialogRef.close();
  }
}
