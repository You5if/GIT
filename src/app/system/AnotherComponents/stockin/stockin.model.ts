import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class StockInModel {
constructor(


        public stockInId: number,
                public stockInDate: Date,
                public stockInCode: string,
                public description: string,
                public wareHouseId: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}
export class stockinproductModel {
        constructor(
                public stockInProductId: number,
                public stockInId: number,
                public productId: number,
                public quantity: number,
                public productUnitId: number,
                public active: boolean,
    public entryMode: string,
    public readOnly: boolean,
    public auditColumns: any,
        ) { }
}

