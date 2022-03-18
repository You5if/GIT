import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class InvoiceModel {
constructor(


        public invoiceId: number,
                public invoiceNo: string,
                public invoiceDate: Date,
                public discountType: number,
                public discountAmount: number,
                public customerId: number,
                public currency: number,
                public wareHouseId: number,
                public customerAccountId: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}
export class invoiceproductModel {
        constructor(
                public invoiceProductId: number,
                public invoiceId: number,
                public productId: number,
                public quantity: number,
                public productUnitId: number,
                public unitPrice: number,
                public totalPrice: number,
                public active: boolean,
    public entryMode: string,
    public readOnly: boolean,
    public auditColumns: any,
        ) { }
}
export class invoicetaxModel {
        constructor(
                public invoiceTaxId: number,
                public invoiceId: number,
                public taxId: number,
                public active: boolean,
    public entryMode: string,
    public readOnly: boolean,
    public auditColumns: any,
        ) { }
}
export class productPricingModel {
        constructor(
                public unitId: number,
                public unitName: string,
                public unitPrice: number,
                
        ) { }
}
export class SortingModel {
        constructor(
        
        
                public id: number,
                public code: string,
                public name: string,
                public array: any,
                public value: string,
                        
        ) { }
        }
        export class FilteringModel {
        constructor(
        
        
                public columnName: string,
                public displayName: string,
                public frontEndType: string,
                public tableColumnId: number,
                public tableId: number,
                public array1: any,
                public array2: any,
                public operation: string,
                public permission1: boolean,
                public permission2: boolean,
                public value1: string,
                public value2: string
        
        
        
                        
        ) { }
        }

        export interface DeleteModel {
                name: string,
        id: number;
              }
