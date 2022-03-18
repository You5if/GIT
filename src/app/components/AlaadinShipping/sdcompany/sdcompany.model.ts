import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class SDCompanyModel {
constructor(
      public sdCompanyId: number,
      public company:	string,
      public sdCityId: number,
      public sdCityPostalCodeId: number,
      public address:	string,
      public otherInformation: string,
      public entryMode: string,
      public active: boolean,
      public readOnly: boolean,
      public sdCompanyLocation: sdCompanyLocationModel[],
      public auditColumns: any,
) { }
}

export class sdCompanyLocationModel {
  constructor(
    public sdCompanyLocationId: number,
    public srNo: number,
    public sdCompanyId: number,
    public location: string,
    public active: boolean,
    public deleted: boolean,
    public entryStatus: number,
  ) { }
}
