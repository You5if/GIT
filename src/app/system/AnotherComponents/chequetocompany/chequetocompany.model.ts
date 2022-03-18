import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class ChequeToCompanyModel {
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
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

