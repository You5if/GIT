import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class AccountModel {
constructor(


        public accountId: number,
                public accountName: string,
                public accountCode: string,
                public accountType: number,
                public parentAccountId: number,
                public accountDetail: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}
export class resValModel {
        constructor(
                public unitId: number,
                public unitName: string,
                public unitPrice: number,
                
        ) { }
}

