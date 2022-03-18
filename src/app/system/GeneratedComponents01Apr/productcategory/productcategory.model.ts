import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class ProductCategoryModel {
constructor(


        public productCategoryId: number,
                public categoryCode: string,
                public categoryName: string,
                public description: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

