import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WarningBoxComponent } from './warning-box/warning-box.component';
import { ErrorBoxComponent } from './error-box/error-box.component';
import { APIResultModel } from '../misc/APIResult.Model';
import { ErrorApiBoxComponent } from './error-api-box/error-api-box.component';



@Injectable({
  providedIn: 'root'
})
export class MessageBoxService {
  blankGroup(arg0: string) {
    this.dialog.open(WarningBoxComponent, {
      data: {
        boxTitle: 'Warning!',
        errorMessage: 'Fill all required fields with proper values!'
      }
    });
  }
  blankGroupMessage() {
    this.dialog.open(WarningBoxComponent, {
      data: {
        boxTitle: 'Warning!',
        errorMessage: 'Fill all required fields with proper values!'
      }
    });
  }


  constructor(public dialog: MatDialog) { }

  public OpertaionNotAllowed(fieldName: string): void {
    this.dialog.open(WarningBoxComponent, {
      data: {
        boxTitle: 'Not Allowed!',
        errorMessage: fieldName + ' operation is not allowed..!'
      }
    });
  }

  public FillRequired(): void {
    this.dialog.open(WarningBoxComponent, {
      data: {
        boxTitle: 'Warning!',
        errorMessage: 'Fill all required fields with proper values!'
      }
    });
  }

  public InvlaidEntry(): void {
    this.dialog.open(WarningBoxComponent, {
      data: {
        boxTitle: 'Warning!',
        errorMessage: 'Invalid entry!'
      }
    });
  }

  public InvalidEntryLine() {
    return 'Invalid Entry!';
  }

  public InvalidLine(fieldName: string) {
    return 'Invalid ' + fieldName + '!';
  }

  public payrollProcessed() {
    this.dialog.open(WarningBoxComponent, {
      data: {
        boxTitle: 'Success!',
        errorMessage: 'Payroll processed!'
      }
    });
  }

  public warning(warningMessage: string): void {
    this.dialog.open(WarningBoxComponent, {
      data: {
        boxTitle: 'Warning!',
        errorMessage: warningMessage
      }
    });
  }

  public blank(fieldName: string): void {
    this.dialog.open(WarningBoxComponent, {
      data: {
        boxTitle: 'Warning!',
        errorMessage: fieldName + ' cannot be blank!'
      }
    });
  }

  public requiredField(fieldName: string): void {
    this.dialog.open(WarningBoxComponent, {
      data: {
        boxTitle: 'Warning!',
        errorMessage: fieldName + ' is required for following action!'
      }
    });
  }

  public blankLine(fieldName: string) {
    return fieldName + ' cannot be blank!';
  }

  public success(fieldName: string): void {
    this.dialog.open(WarningBoxComponent, {
      data: {
        boxTitle: 'Success!',
        errorMessage: fieldName + ' completed successfully!'
      }
    });
  }

  public save(fieldName: string): void {
    this.dialog.open(WarningBoxComponent, {
      data: {
        boxTitle: 'Saved!',
        errorMessage: fieldName + ' saved successfully!'
      }
    });
  }

  public notMatching(fieldName1: string, fieldName2: string): void {
    this.dialog.open(WarningBoxComponent, {
      data: {
        boxTitle: 'Warning!',
        errorMessage: fieldName1 + ' not matching with ' + fieldName2 + '!'
      }
    });
  }

  public showError(error: string): void {
    this.dialog.open(ErrorBoxComponent, {
      data: {
        boxTitle: 'Error!',
        errorMessage: error
      }
    });
  }

  public showAPIError(error: APIResultModel): void {
    this.dialog.open(ErrorApiBoxComponent, {
      data: error
    });
  }


  public showInfo(title: string, message: string): void {
    this.dialog.open(WarningBoxComponent, {
      data: {
        boxTitle: title,
        errorMessage: message
      }
    });
  }

  public showEmployeeInfo(title: string, message: string, cb): void {
    const ref = this.dialog.open(WarningBoxComponent, {
      data: {
        boxTitle: title,
        errorMessage: message
      }
    });
    ref.afterClosed().subscribe((res) => cb());
  }

  public greaterThenEqualTo(fieldName1: string, fieldName2: string): void {
    this.dialog.open(WarningBoxComponent, {
      data: {
        boxTitle: 'Warning!',
        errorMessage: fieldName1 + ' cannot be greater then or equalt to ' + fieldName2 + '!'
      }
    });
  }

}
