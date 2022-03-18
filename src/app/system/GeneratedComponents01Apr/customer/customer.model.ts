import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class CustomerModel {
constructor(


        public customerId: number,
                public customerCode: string,
                public customerName: string,
                public customerEmail: string,
                public customerMobile1: string,
                public customerMobile2: string,
                public customerMobile3: string,
                public address: string,
                public street1: string,
                public street2: string,
                public city: string,
                public state: string,
                public area: string,
                public customerLimit: number,
                public creditTerm: number,
                public taxCardNo: string,
                public taxOffice: string,
                public remarks: string,
                public customerCompanyName: string,
                public aPIImagePath: string,
                public aPIPath: string,
                public extension: string,
                public fileName: string,
                public fullPath: string,
                public originalFileName: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

export class CustomerAccountModel {
        constructor(
                public customerAccountId: number,
                public customerId: number,
                public accountId: number,
                public description: string,
                public accountName: string,
                public accountNumber: string,
                public active: boolean,
    public entryMode: string,
    public readOnly: boolean,
    public auditColumns: any,
        ) { }
}

