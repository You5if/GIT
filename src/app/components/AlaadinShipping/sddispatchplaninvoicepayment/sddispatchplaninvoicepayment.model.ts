import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class SDDispatchPlanInvoicePaymentModel {
constructor(


        public sdDispatchPlanInvoicePaymentId: number,
	public sdDispatchPlanInvoiceId: number,
	public paymentDate: Date,
	public paid: boolean,
	public remarks: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

