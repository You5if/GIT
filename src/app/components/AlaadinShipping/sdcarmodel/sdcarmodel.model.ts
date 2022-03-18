import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class SDCarModelModel {
constructor(


        public sdCarModelId: number,
                public carModel: string,
                public sdCarMakeId: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

