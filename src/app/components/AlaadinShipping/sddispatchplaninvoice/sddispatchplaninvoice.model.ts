import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class SDDispatchPlanInvoiceModel {
constructor(
        public sdDispatchPlanInvoiceId: number,
	      public invoiceDate: Date,
	      public invoiceNumber: string,
	      public sdDispatchPlanId: number,
	      public invoiceTotalAmount: number,
	      public invoiceStatusId: number,
        public entryMode: string,
        public active: boolean,
        public sdDispatchPlanInvoiceDetail: SDDispatchPlanInvoiceDetailModel[],
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

export class SDDispatchPlanInvoiceDetailModel {
  constructor(
          public sdDispatchPlanInvoiceDetailId: number,
          public srNo: number,
          public sdDispatchPlanInvoiceId: number,
          public sdDispatchPlanExpenseId: number,
          public active: boolean,
          public deleted: boolean,
          public entryStatus: number,
  ) { }
}
