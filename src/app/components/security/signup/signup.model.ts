import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class SDCompanyModel {
  constructor(
          public sdCompanyId: number,
          public company: string,
          public sdCityId: number,
          public sdCityPostalCodeId: number,
          public address: string,
          public otherInformation: string,
          public active: boolean,
          public entryMode: string,
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


export class SDUserModel {
  constructor(
          public sdUserId: number,
          public sdUserName: string,
          public displayName: string,
          public password: string,
          public externalTypeId: number,
          public externalId: string,
          public activationStatusId: number,
          public sdCompanyId: number,
          public roleId: number,
          public active: boolean,
          public entryMode: string,
          public readOnly: boolean,
          public auditColumns: any,
  ) { }
}

export class UserModel {
  constructor(
          public username: string,
          public password: string,
          public roleId: number,
  ) { }
}


