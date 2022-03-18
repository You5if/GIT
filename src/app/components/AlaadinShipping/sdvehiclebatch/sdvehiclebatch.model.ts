import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class SDVehicleBatchModel {
constructor(


        public sdVehicleBatchId: number,
	public vechicleBatchCode: string,
	public batchDate: Date,
	public totalVehicles: number,
	public sdCompanyId: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

