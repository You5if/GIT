import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class PaymentToCompanyModel {
constructor(


        public paymentToCompanyId: number,
                public paymentDate: Date,
                public paymentCode: string,
                public paymentType: number,
                public currency: number,
                public description: string,
                public amount: number,
                public paymentAgainst: number,
                public invoiceId: number,
                public chequeId: number,
                public customerId: number,
                public customerAccountId: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}
export class chequetocompanyModel {
        constructor(
                public chequeToCompanyId: number,
                public chequeNumber: string,
                public chequeType: number,
                public currency: number,
                public amount: number,
                public fromCheque: number,
                public toCheque: number,
                public bankListId: number,
                public chequeName: string,
                public description: string,
                public companyBankBranchAccountId: number,
                public dueDate: Date,
                public customerId: number,
                public customerAccountId: number,
                public paymentToCompanyId: number,
                public active: boolean,
    public entryMode: string,
    public readOnly: boolean,
    public auditColumns: any,
        ) { }
}

export class wiretransfertocompanyModel {
        constructor(
                public wireTransferToCompanyId: number,
                public transferCode: string,
                public fromAccount: string,
                public accountName: string,
                public companyBankBranchAccountId: number,
                public description: string,
                public transferDate: Date,
                public customerId: number,
                public customerAccountId: number,
                public paymentToCompanyId: number,
                public active: boolean,
    public entryMode: string,
    public readOnly: boolean,
    public auditColumns: any,
        ) { }
}
export class BankDeposittocompanyModel {
        constructor(
                public bankDepositToCompanyId: number,
                public depositCode: string,
                public companyBankBranchAccountId: number,
                public depositDate: Date,
                public description: string,
                public person: string,
                public customerId: number,
                public customerAccountId: number,
                public paymentToCompanyId: number,
                public active: boolean,
    public entryMode: string,
    public readOnly: boolean,
    public auditColumns: any,
        ) { }
}
export class paymenttocompanyattachmentModel {
        constructor(
                public paymentToCompanyAttachmentId: number,
                public paymentToCompanyId: number,
                public aPIImagePath: string,
                public aPIPath: string,
                public extension: string,
                public fileName: string,
                public fullPath: string,
                public originalFileName: string,
                public active: boolean,
    public entryMode: string,
    public readOnly: boolean,
    public auditColumns: any,
        ) { }
}
