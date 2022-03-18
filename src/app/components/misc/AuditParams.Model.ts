// export class AuditParamsModel {
//     constructor(
//         public auditURL: string
//     ) { }
// }

export class AuditModel {
    constructor(
        public approvalStatusId: number,
        public companyId: number,
        public branchId: number,
        public financialYearId: number,
        public userId: number,
        public mACAddress: string,
        public hostName: string,
        public iPAddress: string,
        public deviceType: string
    ) { }
}
