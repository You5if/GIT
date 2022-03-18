import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class SDStateModel {
constructor(


        public sdStateId: number,
	public state: string,
	public sdCountryId:	number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

