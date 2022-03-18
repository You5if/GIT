import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { AppGlobals } from "src/app/app.global";
import { CommonService } from "./common.service";
import { Observable } from "rxjs";
import { SelectModel, SelectCodeModel } from "../misc/SelectModel";
import { map, catchError } from "rxjs/operators";
import { AuthService } from "../security/auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class SelectService {
  constructor(
    private http: Http,
    private httpClient: HttpClient,
    private _globals: AppGlobals,
    private _cf: CommonService,
    private _auth: AuthService
  ) {}

  getMisc(
    pMiscId: number,
    pParentMiscId: number,
    pNoneRequired: boolean
  ): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl +
          "Common/selectddlmisc/" +
          pMiscId +
          "/" +
          pParentMiscId +
          "/" +
          pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getPageSortColumns(pTableId: number): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl +
          "Ddl/ddlSortColumn/" +
          pTableId +
          "/" +
          this._auth.getUserId()
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getCurrency(pNoneRequired: boolean): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl + "Ddl/currency/" + pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getShift(pNoneRequired: boolean): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl + "Ddl/shift/" + pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getAllowance(pNoneRequired: boolean): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl + "Ddl/allowance/" + pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getCity(pNoneRequired: boolean): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl + "Ddl/city/" + pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getAccount(pNoneRequired: boolean): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl + "Ddl/account/" + pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }
  getProject(pNoneRequired: boolean): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl + "Ddl/project/" + pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }
  getBank(pNoneRequired: boolean): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl + "Ddl/bank/" + pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getShippingCities(pNoneRequired: boolean): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl + "Ddl/shippingcities/" + pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getDepartment(pNoneRequired: boolean): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl + "Ddl/department/" + pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  generateNumbers(a: number, b: number) {
    const nums = [];
    for (let i = a; i <= b; i++) {
      nums.push(i);
    }
    return nums;
  }

  getEmployeeName(pName: string) {
    if (pName.length > 2) {
      return this.httpClient
        .get<SelectCodeModel[]>(
          this._globals.baseAPIUrl + "Ddl/premployeeauto/" + pName
        )
        .pipe(
          map((fieldDetails: SelectCodeModel[]) => {
            return fieldDetails;
          }),
          catchError(this._cf.handleError)
        );
    }
  }

  getEmpDetails(pId: number) {
    return this.httpClient
      .get(this._globals.baseAPIUrl + "Ddl/premployeecode/" + pId + "/false")
      .pipe(
        map((fieldDetails: SelectCodeModel[]) => {
          return fieldDetails;
        }),
        catchError(this._cf.handleError)
      );
  }

  getOtherAllowance(pNoneRequired: boolean): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl + "Ddl/getotherallowance/" + pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getRole(pNoneRequired: boolean): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl + "Ddl/getroles/" + pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getUniqueCities(): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(this._globals.baseAPIUrl + "Ddl/uniquecities")
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getJobs(pNoneRequired: boolean): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(this._globals.baseAPIUrl + "Ddl/job/" + pNoneRequired)
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getCompanyName(pId: number) {
    return this.httpClient
      .get(this._globals.baseAPIUrl + "Ddl/sdcompanyname/" + pId + "/false")
      .pipe(
        map((fieldDetails: SelectCodeModel[]) => {
          return fieldDetails;
        }),
        catchError(this._cf.handleError)
      );
  }

  getShippingCompany(pNoneRequired: boolean): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl + "Ddl/shippingcompany/" + pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getVehicleBatch(pNoneRequired: boolean): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl + "Ddl/vehiclebatch/" + pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getCompanies(pNoneRequired: boolean = false): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl + "Ddl/companies/" + pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getStates(pNoneRequired: boolean): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl + "Ddl/states/" + pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getCities(pNoneRequired: boolean): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl + "Ddl/sdcities/" + pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getPostalCodeByCity(
    pCityId: number,
    pNoneRequired: boolean
  ): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl +
          "Ddl/postalcode/" +
          pCityId +
          "/" +
          pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getCityName(
    pCityId: number,
    pNoneRequired: boolean
  ): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl +
          "Ddl/cityname/" +
          pCityId +
          "/" +
          pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getVinName(pName: string) {
    if (pName.length > 2) {
      return this.httpClient
        .get<SelectModel[]>(this._globals.baseAPIUrl + "Ddl/vinauto/" + pName)
        .pipe(
          map((fieldDetails: SelectModel[]) => {
            return fieldDetails;
          }),
          catchError(this._cf.handleError)
        );
    }
  }

  getPlanName(pName: string) {
    if (pName.length > 2) {
      return this.httpClient
        .get<SelectModel[]>(this._globals.baseAPIUrl + "Ddl/planauto/" + pName)
        .pipe(
          map((fieldDetails: SelectModel[]) => {
            return fieldDetails;
          }),
          catchError(this._cf.handleError)
        );
    }
  }

  getPlanDetails(pId: number) {
    return this.httpClient
      .get(this._globals.baseAPIUrl + "Ddl/sddispatchplan/" + pId + "/false")
      .pipe(
        map((fieldDetails: SelectCodeModel[]) => {
          return fieldDetails;
        }),
        catchError(this._cf.handleError)
      );
  }

  getBrandName(pName: string) {
    if (pName.length > 2) {
      return this.httpClient
        .get<SelectModel[]>(this._globals.baseAPIUrl + "Ddl/brandauto/" + pName)
        .pipe(
          map((fieldDetails: SelectModel[]) => {
            return fieldDetails;
          }),
          catchError(this._cf.handleError)
        );
    }
  }

  getModelName(pName: string) {
    if (pName.length > 2) {
      return this.httpClient
        .get<SelectModel[]>(this._globals.baseAPIUrl + "Ddl/modelauto/" + pName)
        .pipe(
          map((fieldDetails: SelectModel[]) => {
            return fieldDetails;
          }),
          catchError(this._cf.handleError)
        );
    }
  }

  getAllCompanies(pNoneRequired: boolean): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl + "Ddl/allsdcompanyname/" + pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getConsignee(
    pCompanyId: number,
    pNoneRequired: boolean
  ): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl +
          "Ddl/companylocation/" +
          pCompanyId +
          "/" +
          pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getCitiesByState(
    pStateId: number,
    pNoneRequired: boolean
  ): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl + "Ddl/city/" + pStateId + "/" + pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getStatesByCountry(
    pCountryId: number,
    pNoneRequired: boolean
  ): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl +
          "Ddl/state/" +
          pCountryId +
          "/" +
          pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getCountry(pNoneRequired: boolean): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl + "Ddl/country/" + pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getCountryByState(
    pStateId: number,
    pNoneRequired: boolean
  ): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl +
          "Ddl/countrybystate/" +
          pStateId +
          "/" +
          pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getCarMake(pNoneRequired: boolean): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl + "Ddl/carmake/" + pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getCarModel(
    pMakeId: number,
    pNoneRequired: boolean
  ): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl +
          "Ddl/carmodel/" +
          pMakeId +
          "/" +
          pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getStateByCity(
    pCityId: number,
    pNoneRequired: boolean
  ): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl +
          "Ddl/statebycity/" +
          pCityId +
          "/" +
          pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getRoutes(pNoneRequired: boolean): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl + "Ddl/routes/" + pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getStations(pNoneRequired: boolean): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl + "Ddl/stations/" + pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getCompanyContacts(pId: number) {
    return this.httpClient
      .get(this._globals.baseAPIUrl + "Ddl/getcompanycontacts/" + pId)
      .pipe(
        map((fieldDetails: SelectCodeModel[]) => {
          return fieldDetails;
        }),
        catchError(this._cf.handleError)
      );
  }

  getUsers(pNoneRequired: boolean): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl + "Ddl/getusers/" + pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }

  getInvoices(pNoneRequired: boolean = false): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl + "Ddl/invoice/" + pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }


  getDropdown(IdColumn:string, TableName:string, DisplayColumn:string, Condition:string,  pNoneRequired: boolean = false): Observable<SelectModel[]> {
    return this.httpClient
      .get<SelectModel[]>(
        this._globals.baseAPIUrl + "Ddl/getdropdown/" +IdColumn +"/" + TableName +"/" + DisplayColumn + "/"  + Condition + "/" + pNoneRequired
      )
      .pipe(
        map((response: SelectModel[]) => {
          return response;
        }),
        catchError(this._cf.handleError)
      );
  }


}
