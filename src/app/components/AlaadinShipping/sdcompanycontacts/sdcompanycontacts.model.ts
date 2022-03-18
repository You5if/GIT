import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class SDCompanyContactsModel {
constructor(
        public sdCompanyContactsId: number,
	      public sdCompanyId: number,
	      public contactName: string,
	      public contactDesignation: string,
	      public contactAddress: string,
	      public postalCode: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public sdCompanyContactsDetail: sdCompanyContactsDetailModel[],
        public auditColumns: any,
) { }
}

export class sdCompanyContactsDetailModel {
  constructor(
    public sdCompanyContactsDetailId: number,
    public srNo: number,
    public sdCompanyContactsId: number,
    public contactTypeId: number,
    public contactValue: string,
    public active: boolean,
    public deleted: boolean,
    public entryStatus: number,
  ) { }
}
