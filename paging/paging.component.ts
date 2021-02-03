import {Component, OnInit, Output, Input, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { PagingModel } from './paging.model';
import { PagingService } from './paging.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'paging',
    templateUrl: './paging.component.html',
    styleUrls: ['./paging.component.scss']
})
export class PagingComponent implements OnInit, OnChanges {
    @Input() pagingData: PagingModel;
    @Input() itemsPerPage: number[] = this.pagingService.itemsPerPage;
    @Input() showAll = false;
    @Output() outputPaging = new EventEmitter<PagingModel>();
    localPagingStateData: PagingModel;

    listPageShow = [];
    constructor(private pagingService: PagingService) {
    }

    ngOnInit() {
        this.localPagingStateData = {...this.pagingData};
        this.getListPagesShow();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.pagingData) {
            this.localPagingStateData = {...changes.pagingData.currentValue};
            this.getListPagesShow();
        }
    }

    isDisabled(page: string, pageCurent: number): boolean {
        return page === '...' || page === pageCurent.toString();
    }

    setPage(currentPage) {
        const pagingDataEmit = {...this.localPagingStateData};
        pagingDataEmit.CurrentPage = Number(currentPage);
        // this.localPagingStateData = this.pagingService.getPager(pagingDataEmit);
        this.emitUserPaging(pagingDataEmit);
    }

    getListPagesShow() {
        this.listPageShow = this.pagingService.getArrayPages(this.pagingData.TotalPage, this.pagingData.CurrentPage);
    }

    onItemPerPageChange(pageSize) {
        const pagingDataEmit = {...this.localPagingStateData};
        if (this.pagingData.PageSize !== pageSize) {
            pagingDataEmit.PageSize = pageSize;
            pagingDataEmit.CurrentPage = 1;
            this.emitUserPaging(pagingDataEmit);
        }
    }

    getRangeItemShowBaseOnCurrentPage(): string {
        let totalItemDisplay = '';
        if (this.localPagingStateData) {
            if (this.localPagingStateData.TotalCount > 1) {
                const currentPage = this.localPagingStateData.CurrentPage > 0 ? this.localPagingStateData.CurrentPage : 1;
                const startNumberRecord = (currentPage - 1) * this.localPagingStateData.PageSize + 1;
                let endNumberRecord = (currentPage) * this.localPagingStateData.PageSize;
                // Check is get total count
                if (this.localPagingStateData.PageSize === 0) {
                    endNumberRecord = this.localPagingStateData.TotalCount;
                }
                if (endNumberRecord > this.localPagingStateData.TotalCount) {
                    endNumberRecord = this.localPagingStateData.TotalCount;
                }
                totalItemDisplay += `${startNumberRecord}-${endNumberRecord}/`;
            }
            totalItemDisplay += String(this.localPagingStateData.TotalCount) + '行';
        }
        return totalItemDisplay;
    }

    private emitUserPaging(pagingDataEmit): void {
      this.outputPaging.emit(pagingDataEmit);
    }
}
