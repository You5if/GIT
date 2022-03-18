export class LoginModule {
    constructor(
        //step 5 of security(next: login.component.ts > submit)
        public username: string,
        public password: string,
        public loginType: number
    ) { }
}
