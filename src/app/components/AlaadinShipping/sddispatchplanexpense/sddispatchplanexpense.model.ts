import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class SDDispatchPlanExpenseModel {
constructor(
      public sdDispatchPlanExpenseId: number,
      public expenseTypeId: number,
      public sdDispatchPlanId: number,
      public sdVehicleDetailId: number,
      public expenseDate: Date,
      public billableItemId: number,
      public description: string,
      public paymentTypeId: number,
      public amount: number,
      public costPrice: number,
      public referenceNumber: string,
      public paymentStatusId: number,
      public entryMode: string,
      public active: boolean,
      public readOnly: boolean,
      public auditColumns: any,
) { }
}

