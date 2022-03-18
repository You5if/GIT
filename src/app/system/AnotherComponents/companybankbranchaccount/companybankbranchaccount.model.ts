import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class CompanyBankBranchAccountModel {
constructor(


        public companyBankBranchAccountId: number,
                public companyBankBranchId: number,
                public accountNumber: string,
                public accountType: number,
                public description: string,
                public currency: number,
                public isMultiCurrency: boolean,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

