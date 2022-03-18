import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class ExpenseFilingModel {
constructor(


        public expenseFilingId: number,
        public entryDate: string,
        public currency: number,
        public fromAccount: number,
        public toAccount: number,
        public paymentType: number,
        public billable: boolean,
        public recurring: boolean,
        public entryMode: string,
        public expenseCode: string,
        public reference: string,
        public expenseFilingItem: ExpenseFilingItemModel[],
        public expenseFilingTax: ExpenseFilingTaxModel[],
        public journalEntryId: number,
        public journalEntryDetailId: number,
        public remarks: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

export class ExpenseFilingItemModel {
  constructor(
          public expenseFilingItemId: number,
          public expenseFilingId: number,
          public itemName: string,
          public amount: number,
          public journalEntryId: number,
          public journalEntryDetailId: number,
          public active: boolean,
          public readOnly: boolean,
          public auditColumns: any,
  ) { }
  }

  export class ExpenseFilingTaxModel {
    constructor(
            public expenseFilingTaxId: number,
            public expenseFilingId: number,
            public taxId: number,
            public taxAmount: number,
            public journalEntryId: number,
            public journalEntryDetailId: number,
            public active: boolean,
            public readOnly: boolean,
            public auditColumns: any,
    ) { }
    }
  export class ExpenseCodeResponseModel {
    constructor(
            public id: number,
            public name: string,
            
    ) { }
    }
