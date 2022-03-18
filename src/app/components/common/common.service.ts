import { Injectable } from "@angular/core";
import { RequestOptions, Headers, Http } from "@angular/http";
import { throwError, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AppGlobals } from "src/app/app.global";
import { APIResultModel } from "../misc/APIResult.Model";
import { PageEvent } from "@angular/material";
import { UIService } from "../shared/uiservices/UI.service";
import { FilterService } from "../filter/filter.service";

declare var jquery: any;
declare var $: any;

@Injectable({
  providedIn: "root",
})
export class CommonService {
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  autoCompleteAPIURL: string;

  constructor(
    private _globals: AppGlobals,
    private _filter: FilterService,
    private httpClient: HttpClient,
    private http: Http,
    private _ui: UIService
  ) {}

  public requestOptions() {
    //step 3 of security (next: auth.service.ts > login())
    this.userToken = localStorage.getItem(this._globals.baseAppName + "_token");
    const headers = new Headers({
      authorization: "Bearer " + this.userToken,
      "Content-Type": "application/json",
    });
    console.log(headers);
    return new RequestOptions({ headers: headers });
  }

  public handleError(error: any) {
    try {
      const applicationError = error.headers.get("Application-Error");
      if (applicationError) {
        // return throwError(applicationError);
      }
      // let modelStateErrors = '';
      const mApiError: APIResultModel = {
        id: 0,
        errorNo: 0,
        errorMessage: "",
        documentNo: "",
        sQLErrorLineNo: 0,
        sQLErrorMessage: "",
        sQLErrorNumber: 0,
        sQLErrorSeverity: 0,
        sQLErrorState: 0,
        sQLObjectName: "",
      };
      mApiError.id = 0;
      mApiError.errorNo = 0;
      mApiError.errorMessage = "";
      if (error.status === 401) {
        return throwError("Error 401: Unauthorized access!");
      } else {
        const serverError = error.json();
        let i = 1;
        if (serverError) {
          // tslint:disable-next-line:forin
          for (const key in serverError) {
            if (serverError[key]) {
              switch (key) {
                case "id": {
                  mApiError.id = serverError[key];
                  break;
                }
                case "errorNo": {
                  mApiError.errorNo = serverError[key];
                  break;
                }
                case "errorMessage": {
                  mApiError.errorMessage = serverError[key];
                  break;
                }
                case "documentNo": {
                  mApiError.documentNo = serverError[key];
                  break;
                }
                case "sQLErrorNumber": {
                  mApiError.sQLErrorNumber = serverError[key];
                  break;
                }
                case "sQLErrorSeverity": {
                  mApiError.sQLErrorSeverity = serverError[key];
                  break;
                }
                case "sQLErrorState": {
                  mApiError.sQLErrorState = serverError[key];
                  break;
                }
                case "sQLObjectName": {
                  mApiError.sQLObjectName = serverError[key];
                  break;
                }
                case "sQLErrorLineNo": {
                  mApiError.sQLErrorLineNo = serverError[key];
                  break;
                }
                default: {
                  mApiError.errorMessage =
                    mApiError.errorMessage + serverError[key] + ";";
                  break;
                }
              }
            }
            i = i + 1;
          }
        }
        return throwError(mApiError);
      }
    } catch (error) {
      return throwError(error);
    }
  }

  reloadJSFile() {
    $.ajax({
      url: "../../../assets/js/scripts.js",
      dataType: "script",
      success: "qp_required_misc()",
    });
  }

  getPageData(
    tableName: string,
    pScreenId: number,
    pUserId: number,
    pTableId: number,
    pRecordsPerPage: number,
    pPageNo: number,
    pLastPage: boolean
  ) {
    return this.http
      .post(
        this._globals.baseAPIUrl +
          tableName +
          "/getpagedata/" +
          pScreenId +
          "/" +
          pUserId +
          "/" +
          pRecordsPerPage +
          "/" +
          pPageNo +
          "/" +
          pTableId +
          "/" +
          pLastPage,
        [],
        this.requestOptions()
      )
      .pipe(
        map((res: any) => res.json()),
        catchError(this.handleError)
      );
  }

  getPageDataCond(
    tableName: string,
    pScreenId: number,
    pUserId: number,
    pTableId: number,
    pRecordsPerPage: number,
    pPageNo: number,
    pLastPage: boolean,
    pWhere: number
  ) {
    return this.http
      .post(
        this._globals.baseAPIUrl +
          tableName +
          "/getpagedata/" +
          pScreenId +
          "/" +
          pUserId +
          "/" +
          pRecordsPerPage +
          "/" +
          pPageNo +
          "/" +
          pTableId +
          "/" +
          pLastPage +
          "/" +
          pWhere,
        [],
        this.requestOptions()
      )
      .pipe(
        map((res: any) => res.json()),
        catchError(this.handleError)
      );
  }

  getPageDataCond2(
    tableName: string,
    pScreenId: number,
    pUserId: number,
    pTableId: number,
    pRecordsPerPage: number,
    pPageNo: number,
    pLastPage: boolean,
    pWhere: number
  ) {
    return this.http
      .post(
        this._globals.baseAPIUrl +
          tableName +
          "/getpageinfo/" +
          pScreenId +
          "/" +
          pUserId +
          "/" +
          pRecordsPerPage +
          "/" +
          pPageNo +
          "/" +
          pTableId +
          "/" +
          pLastPage +
          "/" +
          pWhere,
        [],
        this.requestOptions()
      )
      .pipe(
        map((res: any) => res.json()),
        catchError(this.handleError)
      );
  }

  getPageData2(
    tableName: string,
    pScreenId: number,
    pUserId: number,
    pTableId: number,
    pRecordsPerPage: number,
    pPageNo: number,
    pLastPage: boolean,
    pOrderBy: string
  ) {
    return this.http
      .post(
        this._globals.baseAPIUrl +
          tableName +
          "/getpagedata2/" +
          pScreenId +
          "/" +
          pUserId +
          "/" +
          pRecordsPerPage +
          "/" +
          pPageNo +
          "/" +
          pTableId +
          "/" +
          pLastPage +
          "/" +
          pOrderBy,
        this._filter.myFilter,
        this.requestOptions()
      )
      .pipe(
        map((res: any) => res.json()),
        catchError(this.handleError)
      );
  }

  getPageData2Id(
    tableName: string,
    pScreenId: number,
    pUserId: number,
    pTableId: number,
    pRecordsPerPage: number,
    pPageNo: number,
    pLastPage: boolean
  ) {
    return this.http
      .get(this._globals.baseAPIUrl + tableName + "/" + pScreenId)
      .pipe(
        map((res: any) => res.json()),
        catchError(this.handleError)
      );
  }

  public getPageDataOnPaginatorOperation(
    event: PageEvent,
    pTableName: string,
    pScreenId: number,
    pUserId: number,
    pTableId: number,
    totalRecords: number
  ) {
    this._ui.loadingStateChanged.next(true);

    const currentPage = event.pageIndex + 1;
    let isLastPage: boolean;

    if (totalRecords === currentPage) {
      isLastPage = true;
    } else {
      isLastPage = false;
    }

    return this.getPageData(
      pTableName,
      pScreenId,
      pUserId,
      pTableId,
      event.pageSize,
      currentPage,
      isLastPage
    );
  }

  public getPageDataOnPaginatorOperation2(
    event: PageEvent,
    pTableName: string,
    pScreenId: number,
    pUserId: number,
    pTableId: number,
    totalRecords: number,
    pOrderBy: string
  ) {
    this._ui.loadingStateChanged.next(true);

    const currentPage = event.pageIndex + 1;
    let isLastPage: boolean;

    if (totalRecords === currentPage) {
      isLastPage = true;
    } else {
      isLastPage = false;
    }

    return this.getPageData2(
      pTableName,
      pScreenId,
      pUserId,
      pTableId,
      event.pageSize,
      currentPage,
      isLastPage,
      pOrderBy
    );
  }

  public getPageDataOnPaginatorOperationCond(
    event: PageEvent,
    pTableName: string,
    pScreenId: number,
    pUserId: number,
    pTableId: number,
    totalRecords: number,
    pWhere: number
  ) {
    this._ui.loadingStateChanged.next(true);

    const currentPage = event.pageIndex + 1;
    let isLastPage: boolean;

    if (totalRecords === currentPage) {
      isLastPage = true;
    } else {
      isLastPage = false;
    }

    return this.getPageDataCond(
      pTableName,
      pScreenId,
      pUserId,
      pTableId,
      event.pageSize,
      currentPage,
      isLastPage,
      pWhere
    );
  }

  public getPageDataOnPaginatorOperationCond2(
    event: PageEvent,
    pTableName: string,
    pScreenId: number,
    pUserId: number,
    pTableId: number,
    totalRecords: number,
    pWhere: number
  ) {
    this._ui.loadingStateChanged.next(true);

    const currentPage = event.pageIndex + 1;
    let isLastPage: boolean;

    if (totalRecords === currentPage) {
      isLastPage = true;
    } else {
      isLastPage = false;
    }

    return this.getPageDataCond2(
      pTableName,
      pScreenId,
      pUserId,
      pTableId,
      event.pageSize,
      currentPage,
      isLastPage,
      pWhere
    );
  }

  autoCompleteSearch(
    searchString: string,
    id: number,
    autoCompleteAPIName: string
  ): Observable<any> {
    if (id === undefined || id === null) {
      this.autoCompleteAPIURL =
        this._globals +
        "/Ddl/" +
        autoCompleteAPIName +
        "/" +
        searchString +
        "/true";
    } else {
      this.autoCompleteAPIURL =
        this._globals +
        "/Ddl/" +
        autoCompleteAPIName +
        "/" +
        searchString +
        "/" +
        id +
        "/true";
    }
    return this.httpClient.get<any>(this.autoCompleteAPIURL).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
