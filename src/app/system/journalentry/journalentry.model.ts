import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class JournalEntryModel {
constructor(


        public journalEntryId: number,
        public entryName: string,
        public currency: number,
        public description: string,
        public entryMode: string,
        public journalEntryDetailEntry: journalentrydetailModel[],
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
        public entryDate: string,

) { }
}

export class journalentrydetailModel {
        constructor(
                public journalEntryDetailId: number,
                public journalEntryId: number,
                public accountId: number,
                public debit: number,
                public credit: number,
                public reference: string,
                public narration: string,
                public relatedJournalEntryDetailId: number,
                public active: boolean,
    public entryMode: string,
    public readOnly: boolean,
    public auditColumns: any,
        ) { }
}
