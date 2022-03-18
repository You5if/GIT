import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class PaymentFromCompanyModel {
constructor(


        public paymentFromCompanyId: number,
                public paymentDate: Date,
                public paymentCode: string,
                public paymentType: number,
                public currency: number,
                public description: string,
                public amount: number,
                public paymentAgainst: number,
                public expenseId: number,
                public chequeId: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}
export class chequefromcompanyModel {
        constructor(
                public chequeFromCompanyId: number,
                public chequeNumber: string,
                public chequeType: number,
                public currency: number,
                public amount: number,
                public fromCheque: number,
                public toCheque: number,
                public companyBankBranchAccountId: number,
                public chequeName: string,
                public description: string,
                public dueDate: Date,
                public paymentFromCompanyId: number,
                public active: boolean,
    public entryMode: string,
    public readOnly: boolean,
    public auditColumns: any,
        ) { }
}

export class wiretransferfromcompanyModel {
        constructor(
                public wireTransferFromCompanyId: number,
                public transferCode: string,
                public toAccount: string,
                public accountName: string,
                public companyBankBranchAccountId: number,
                public description: string,
                public transferDate: Date,
                public paymentFromCompanyId: number,
                public active: boolean,
    public entryMode: string,
    public readOnly: boolean,
    public auditColumns: any,
        ) { }
}
export class bankdepositfromcompanyModel {
        constructor(
                public bankDepositFromCompanyId: number,
                public depositCode: string,
                public accountNumber: string,
                public depositDate: Date,
                public description: string,
                public person: string,
                public location: string,
                public city: string,
                public branch: string,
                public area: string,
                public bankListId: number,
                public paymentFromCompanyId: number,
                public active: boolean,
    public entryMode: string,
    public readOnly: boolean,
    public auditColumns: any,
        ) { }
}
export class PaymentfromcompanyattachmentModel {
        constructor(
                public paymentFromCompanyAttachmentId: number,
                public paymentFromCompanyId: number,
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

