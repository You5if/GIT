import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class ProductUnitConversionModel {
constructor(


        public productUnitConversionId: number,
                public productFromUnitId: number,
                public productToUnitId: number,
                public quantity: number,
                public description: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

