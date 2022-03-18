export interface APIResultModel {
    id: number;
    errorNo: number;
    errorMessage: string;
    documentNo: string;
    sQLErrorNumber: number;
    sQLErrorSeverity: number;
    sQLErrorState: number;
    sQLObjectName: string;
    sQLErrorLineNo: number;
    sQLErrorMessage: string;
}
