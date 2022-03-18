import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class WareHouseModel {
constructor(


        public wareHouseId: number,
                public wareHouseName: string,
                public description: string,
                public location: string,
                public city: string,
                public area: string,
                public mobile1: string,
                public mobile2: string,
                public email: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

