import { Timestamp } from "rxjs/operators/timestamp";

export class Profile {
    public name: String;
    public desc: String;
    public createDT: Date;
    public monitoring: number;
    public isActive: boolean;
    constructor() {
        this.clear();
      }
    clear(){
        this.name = '';
        this.desc = '';
        this.createDT = null;
        this.monitoring = 0;
        this.isActive = true;
    }
}