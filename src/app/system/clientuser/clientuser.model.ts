import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class ClientUserModel {
constructor(


        public clientUserId: number,
                               public appUserId: number,
                public appRoleId: number,
                public customerId: number,
                public userName: string,
                public displayName: string,
                public password: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

