import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class SDAppFeedbackModel {
constructor(


        public sdAppFeedbackId: number,
	public sdUserId:	number,
	public commentTopicId:	number,
	public comment:	string,
	public recommendation:	number,
	public overall:	number,
	public easy:	number,
	public userful:	number,
	public costEffective:	number,
	public email:	string,
	public feedbackDate:	Date,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

