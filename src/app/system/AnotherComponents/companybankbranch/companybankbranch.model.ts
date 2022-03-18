import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class CompanyBankBranchModel {
constructor(


        public companyBankBranchId: number,
                public companyBankId: number,
                public branchName: string,
                public branchAddress: string,
                public mobile1: string,
                public mobile2: string,
                public email: string,
                public website: string,
                public branchManagerName: string,
                public branchManagerMobile1: string,
                public branchManagerMobile2: string,
                public branchManagerEmail: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

