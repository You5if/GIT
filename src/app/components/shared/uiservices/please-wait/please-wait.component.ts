import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material';
import { UIService } from '../UI.service';
import { CLASS_NAME } from '@angular/flex-layout';

@Component({
  selector: 'app-please-wait',
  templateUrl: './please-wait.component.html',
  styleUrls: ['./please-wait.component.scss']
})
export class PleaseWaitComponent implements OnInit {

  isLoading = false;
  private loadingSubs: Subscription;

  constructor(
    private dialogRef: MatDialogRef<PleaseWaitComponent>,
    private uiService: UIService
  ) { }

  ngOnInit() {
    this.dialogRef.disableClose = true;
    this.dialogRef.addPanelClass("load")
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      if ( isLoading !== true ) {
        this.dialogRef.close();
        
      }
      
    });
  }

}
