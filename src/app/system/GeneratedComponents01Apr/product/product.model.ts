import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class ProductModel {
constructor(


        public productId: number,
                public productCode: string,
                public productName: string,
                public productCategoryId: number,
                public productGroupId: number,
                public barcode: string,
                public qrcode: string,
                public productUnitId: number,
                public aPIImagePath: string,
                public aPIPath: string,
                public extension: string,
                public fileName: string,
                public fullPath: string,
                public originalFileName: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

