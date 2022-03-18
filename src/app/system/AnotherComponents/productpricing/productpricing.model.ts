import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class ProductPricingModel {
constructor(


        public productPricingId: number,
                public productId: number,
                public priceType: number,
                public productUnitId: number,
                public fromDate: Date,
                public toDate: Date,
                public price: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

