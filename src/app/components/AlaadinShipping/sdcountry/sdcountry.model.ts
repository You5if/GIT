import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class SDCountryModel {
constructor(


        public sdCountryId: number,
	public country:	string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

