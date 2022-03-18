export class PageSortModel {
    constructor (
    public sortOrderNo: number,
    public columnName: string,
    public directionId: number,
    public direction: string,
    public pageColumnsId: number,
    public userId: number,
    public tableId: number,
    public columnId: number,
    public deleted: boolean
    ) { }
}
