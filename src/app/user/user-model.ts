/* export class User {
    constructor(
        public displayName: string,
        public email: string,
        public photoURL: string,
        public company: string,
        public profile: string,
    ) { }
} */

export class User {
        public displayName: string;
        public email: string;
        public photoURL: string;
        public company: string;
        public profile: string;
        constructor() {
            this.displayName = '';
            this.email = '';
            this.photoURL = '';
            this.company = '';
            this.profile = '';
          }
}