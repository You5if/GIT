import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CountryModel } from '../country.model';
import { NgForm } from '@angular/forms';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { RegionalService } from '../../regional.service';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';


@Component({
    selector: 'app-country-entry',
    templateUrl: './country-entry.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./country-entry.component.scss']
})

export class CountryEntryComponent implements OnInit {
    url: string;
    dialog_title: string;

    constructor(
        private _ui: UIService,
        private _msg: MessageBoxService,
        private _auth: AuthService,
        private _myService: RegionalService,
        private dialogRef: MatDialogRef<CountryEntryComponent>,
        @Inject(MAT_DIALOG_DATA) public pModel: CountryModel
    ) { }

    ngOnInit() {
        switch (this.pModel.entryMode) {
            case 'A': {
                this.url = 'Country/Create';
                this.dialog_title = 'Add';
                break;
            }
            case 'E': {
                this.url = 'Country/Edit';
                this.dialog_title = 'Edit';
                break;
            }
            case 'D': {
                this.url = 'Country/Delete';
                this.dialog_title = 'Delete';
                break;
            }
            case 'V': {
                this.url = 'Country/View';
                this.dialog_title = 'View';
                break;
            }
            default: {
                this._msg.showError('Option not implemented..!');
                break;
            }
        }
    }

    onSubmit = function (form: CountryModel) {
        if (this.validateForm(form) !== true) {
            return false;
        }
        form.countryId = this.pModel.countryId;
        form.auditColumns = this._auth.getAuditColumns();
        form.entryMode = this.pModel.entryMode;
        try {
            this._myService.getCountrySubmit(form).subscribe((result: APIResultModel) => {
                if (result.errorNo === 0) {
                    this._ui.loadingStateChanged.next(false);
                    this._msg.showInfo(result.errorMessage);
                    this.dialogRef.close();
                } else {
                    this._ui.loadingStateChanged.next(false);
                    this._msg.showError(result.errorMessage);
                    return false;
                }
            }, error => {
                this._ui.loadingStateChanged.next(false);
                this._msg.showAPIError(error);
                return false;
            });
        } catch (error) {
            this._ui.loadingStateChanged.next(false);
            this._msg.showAPIError(error);
            return false;
        }
    };

    onCancel() {
        this.dialogRef.close();
    }

    validateForm(form: CountryModel) {
        if (this.pModel.entryMode === 'E') {
            if (this.pModel.countryId === 0 || this.pModel.countryId === null) {
                this._msg.blank('Country entry');
                return false;
            }
        }
        if (form.countryCode === '' || form.countryCode === null) {
            this._msg.blank('Code');
            return false;
        }
        if (form.country === '' || form.country === null) {
            this._msg.blank('Country');
            return false;
        }
        if (form.isoAlpha2Code === '' || form.isoAlpha2Code === null) {
            this._msg.blank('ISO Alpha 2');
            return false;
        }
        if (form.isoAlpha3Code === '' || form.isoAlpha3Code === null) {
            this._msg.blank('ISO Alpha 3');
            return false;
        }
        if (form.isoNumericCode === '' || form.isoNumericCode === null) {
            this._msg.blank('ISO Numeric');
            return false;
        }
        return true;
    }
}

