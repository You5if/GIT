import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class SDShippingLineCompanyModel {
constructor(


        public sdShippingLineCompanyId: number,
        public company: string,
        public sdCityId: number,
        public address: string,
        public mobile: string,
        public email: string,
        public otherInformation: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

