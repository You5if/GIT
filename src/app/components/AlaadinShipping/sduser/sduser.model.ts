import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
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
          public password: string
  ) { }
}
