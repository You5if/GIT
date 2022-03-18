import { AuditModel } from 'src/app/components/misc/AuditParams.Model';


export class CountryModel {
    constructor(
        public countryId: number,
        public countryCode: string,
        public country: string,
        public isoAlpha2Code: string,
        public isoAlpha3Code: string,
        public isoNumericCode: string,
        public active: boolean,
        public auditColumns: AuditModel,
        public entryMode: string,
        public readOnly: boolean
    ) { }
}
