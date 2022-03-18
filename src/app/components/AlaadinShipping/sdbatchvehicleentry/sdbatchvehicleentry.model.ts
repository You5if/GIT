export class SDBatchVehicleEntryModel {
  constructor(
          public sdCompanyId: number,
          public vehicleName: string,
          public runConditionId: number,
          public vin: string,
          public year: number,
          public sdCarMakeId: number,
          public sdCarModelId: number,
          public vehicleTypeId: number,
          public vehicleColor: string,
          public lotNumber: string,
          public licensePlate: string,
          public sdCityId: number,
          public sdCityPostalCodeId: number,
          public wideLoad: boolean,
          public additionalInformation: string,
          public carLocation: string,
          public carTagNumber: string,
          public keysAvailable: boolean,
          public titleAvailable: boolean,
          public qty: number,
          public sdVehicleDetailPic: SDVehicleDetailPic[],
          public auditColumns: any,
  ) { }
}

export class SDVehicleDetailPic {
  constructor(
    public sdVehicleDetailPicId: number,
    public srNo: number,
    public sdVehicleDetailId: number,
    public apiImagePath: string,
    public apiPath: string,
    public extension: string,
    public fileName: string,
    public fullPath: string,
    public originalFileName: string,
    public active: boolean,
    public entryMode: string,
    public readOnly: boolean,
    public auditColumns: any,
  ) { }
}

export class SDVehicleBatchModel {
  constructor(
          public sdVehicleBatchId: number,
          public vehicleBatchCode: string,
          public batchDate: Date,
          public totalVehicles: number,
          public posted: number,
          public listed: number,
          public notSigned: number,
          public dispatched: number,
          public pickedUp: number,
          public delivered: number,
          public cancelled: number,
          public archived: number,
          public sDCompanyId: number,
          public active: boolean,
          public entryMode: string,
          public readOnly: boolean,
          public auditColumns: any,
  ) { }
}

