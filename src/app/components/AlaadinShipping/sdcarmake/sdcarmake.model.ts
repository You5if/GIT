import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class SDCarMakeModel {
constructor(


        public sdCarMakeId: number,
                public carMake: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

