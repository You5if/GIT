import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class BrdStateModel {
constructor(


        public stateTemplateId: number,
        public stateName: string,
        public orderNo: number,
        public comment: string,
        
        public boardTemplateId: number,
        public AddC: boolean ,
        public cardArray: CardModel[] ,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}


export class CardModel {
        constructor(
                public cardTemplateId: number,
                public title: string,
                public description: string,
                public aPIImagePath: string,
                public aPIPath: string,
                public extension: string,
                public fileName: string,
                public fullPath: string,
                public originalFileName: string,
                public startDate: Date,
                public endDate: Date,
                public boardTemplateId: number,
                public stateTemplateId: number,
                public orderNo: number,
                public totalChecklist: number,
                public checkCompl: number,
                public attachNo: number,
                public active: boolean,
				public entryMode: string,
				public readOnly: boolean,
				public auditColumns: any,
        ) { }
}


export class BrdMemberModel {
        constructor(
                public brdMemberId: number,
                public employeeId: number,
                public boardId: number,
                public boardRoleId: number,
                public active: boolean,
				public entryMode: string,
				public readOnly: boolean,
				public auditColumns: any,
        ) { }
}
