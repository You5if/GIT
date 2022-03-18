import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class SDCityModel {
constructor(


        public sdCityId: number,
	      public city: string,
	      public sdStateId: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

