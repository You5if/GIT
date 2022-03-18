import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class BrdStateModel {
constructor(


        public brdStateId: number,
        public stateName: string,
        public stateOrder: number,
        public boardId: number,
        public AddC: boolean ,
        public showStateName: boolean ,
        public cardArray: CardModel[] ,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}


export class CardModel {
        constructor(
                public cardId: number,
                public title: string,
                public description: string,
                public aPIImagePath: string,
                public aPIPath: string,
                public extension: string,
                public fileName: string,
                public fullPath: string,
                public originalFileName: string,
                public startDate: any,
                public endDate: any,
                public boardId: number,
                public brdStateId: number,
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


export class CardCommentModel {
        constructor(
                public cardCommentId: number,
                public comment: string,
                public commentDate: any,
                public aPIImagePath: string,
                public aPIPath: string,
                public extension: string,
                public fileName: string,
                public fullPath: string,
                public originalFileName: string,
                public edit: boolean,
                public cardId: number,
                public employeeId: number,
                public clientVisible: boolean,
                public active: boolean,
				public entryMode: string,
				public readOnly: boolean,
				public auditColumns: any,
        ) { }

}

export class CardAttachModel {
        constructor(
                public cardAttachId: number,
                public attachDate: any,
                public aPIImagePath: string,
                public aPIPath: string,
                public extension: string,
                public fileName: string,
                public fullPath: string,
                public originalFileName: string,
                public cardId: number,
                public employeeId: number,
                public attachmentDownload: string,
                public clientVisible: boolean,
                public active: boolean,
	        public entryMode: string,
		public readOnly: boolean,
		public auditColumns: any,
        ) { }
}