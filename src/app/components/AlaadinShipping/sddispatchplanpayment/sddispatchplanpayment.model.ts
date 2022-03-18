import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class SDDispatchPlanPaymentModel {
constructor(


        public sdDispatchPlanPaymentId: number,
        public sdDispatchPlanInvoiceId: number,
        public paymentDate: Date,
        public paymentTypeId: number,
        public paymentAmount: number,
        public reference: string,
        public memo: string,
        public sdUserId: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

