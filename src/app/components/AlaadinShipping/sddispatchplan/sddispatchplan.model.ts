import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class SDDispatchPlanModel {
        constructor(
                public sdDispatchPlanId: number,
                public planCode: string,
                public sdCompanyId: number,
                public customerName: string,
                public sdShippingLineCompanyId: number,
                public bookingNumber: string,
                public bookingNumberURL: string,
                public containerNumber: string,
                public description: string,
                public loadingPlanNumber: string,
                public dispatchDate: Date,
                public sdCompanyLocationId: number,
                public planStatusId: number,

                public remarks: string,
                public sdUserId: number,
                public remarksDate: Date,
                public customerRemarks: string,
                public customerUserId: number,
                public customerRemarksDate: Date,
                public sealNumber: string,

                public entryMode: string,
                public active: boolean,
                public sdDispatchPlanVehicle: SDDispatchPlanVehicleModel[],
                public readOnly: boolean,
                public auditColumns: any,
                ) { }
}

export class SDDispatchPlanVehicleModel {
        vehicleColor: string;
        vin: string;
        constructor(
                public sdDispatchPlanVehicleId: number,
                public srNo: number,
                public sdDispatchPlanId: number,
                public sdVehicleDetailId: number,
                public make: string,
                public model: string,
                public active: boolean,
                public deleted: boolean,
                public entryStatus: number,
        ) { }
}

export class SDDispatchVehicleGeneratorModel {
        constructor (
                public sdVehicleDetailId: number,
                public vehicleName: string,
                public runConditionId: number,
                public vin: string,
                public year: number,
                public make: string,
                public model: string,
                public vehicleTypeId: number,
                public vehicleColor: string
        ) { }
}
