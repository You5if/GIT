import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class ProductGroupModel {
constructor(


        public productGroupId: number,
                public groupCode: string,
                public groupName: string,
                public description: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

