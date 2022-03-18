import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class TaxModel {
constructor(


        public taxId: number,
                public taxName: string,
                public taxAmount: number,
                public description: string,
                public status: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

