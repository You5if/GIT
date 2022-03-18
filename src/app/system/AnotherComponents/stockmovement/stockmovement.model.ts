import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class StockMovementModel {
constructor(


        public stockMovementId: number,
                public stockMovementDate: Date,
                public stockMovementCode: string,
                public description: string,
                public fromWareHouseId: number,
                public toWareHouseId: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}
export class stockmovementproductModel {
        constructor(
                public stockMovementProductId: number,
                public stockMovementId: number,
                public productId: number,
                public productUnitId: number,
                public quantity: number,
                public active: boolean,
    public entryMode: string,
    public readOnly: boolean,
    public auditColumns: any,
        ) { }
}
