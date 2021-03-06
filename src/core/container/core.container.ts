import { Core } from './core';
import { Observable } from 'rxjs';

export class CoreContainer extends Core {

    //当前页码
    pageIndex = 1;
    //每页条数
    pageSize = 10;
    //总数
    totalCount = 1;
    //数据集
    dataSet: any[] = [];
    //查询显示加载动画
    tableLoading = false;


    sortFields: number[] = [];

    sortTypes: number[] = [];

    //分页查询方法
    searchPagedListFn: () => Observable<any>;

    constructor() {
        super();
    }

    // 检查权限
    checkAuth(authCode: string): boolean {
        const auths = authCode.split('_');
        if (auths.length < 2) return false;
        const layer = parseInt(auths[auths.length - 2], 10);
        if (isNaN(layer)) return false;
        const index = layer - 1;
        if (index < 0) return false;
        const num = Number(auths[auths.length - 1]);
        const authNum = Number(Core.authNums[index]);
        return (num & authNum) === num;
    }

    async search() {
        this.tableLoading = true;
        await this.searchPagedListFn().toPromise().then(d => {
            this.tableLoading = false;
            this.setTableData(d);
        }, e => {
            this.tableLoading = false;
        });
    }

    async reSearch() {
        this.initPageIndex();
        await this.search();
    }

    pageIndexChange(pageIndex: number) {
        this.pageIndex = pageIndex;
        this.search();
    }

    pageSizeChange(pageSize: number) {
        this.initPageIndex();
        this.pageSize = pageSize;
        this.search();
    }


    initPageIndex() {
        this.pageIndex = 1;
    }


    setPagedQueryParam(param?: any): any {
        return Object.assign(param, {
            PageIndex: this.pageIndex,
            PageSize: this.pageSize,
            SortFields: this.sortFields,
            SortTypes: this.sortTypes
        });
    }

    setTableData(d: any) {
        if (d === null) return;
        this.dataSet = d.Items;
        this.pageIndex = d.PageIndex;
        this.pageSize = d.PageSize;
        this.totalCount = d.TotalCount;
    }

    sortChange(sort: { key: number, value: string }) {

        const index = this.sortFields.indexOf(sort.key);
        if (index > -1) {
            this.sortFields.splice(index, 1);
            this.sortTypes.splice(index, 1);
        }
        if (sort.value === 'ascend') {
            this.sortFields.push(sort.key);
            this.sortTypes.push(SortType.Ascend);
        } else if (sort.value === 'descend') {
            this.sortFields.push(sort.key);
            this.sortTypes.push(SortType.Descend);
        }

        this.reSearch();
    }
}

export enum SortType {
    Ascend,
    Descend
}