import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators';

import { Sources } from './dynamic-form/source.model';
import { Send } from './send.model';


@Injectable({
    providedIn: 'root'
})
export class DApiSerivce {
    baseUrl = 'http://userregistrationapi.autopay-mcs.com/api/';
    
    constructor(private http: HttpClient) {}



controllers(model: Send) {
    return this.http.post(this.baseUrl + 'TestTable/getentry', model);
}
entryA(arr: any){
    return this.http.post(this.baseUrl + 'TestTable/create',arr);
}
entryE(arr: any){
    return this.http.post(this.baseUrl + 'TestTable/edit',arr);
}



//Bank


}
