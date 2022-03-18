import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class BoardModel {
constructor(


        public boardId: number,
                               public boardName: string,
                public remarks: string,
                public aPIImagePath: string,
                public aPIPath: string,
                public extension: string,
                public fileName: string,
                public fullPath: string,
                public originalFileName: string,
                public workspaceId: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

