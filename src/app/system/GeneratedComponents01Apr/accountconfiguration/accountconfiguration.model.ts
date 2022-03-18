import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class AccountConfigurationModel {
constructor(


        public accountConfigurationId: number,
                public configurationName: string,
                public description: string,
                public accountId: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

