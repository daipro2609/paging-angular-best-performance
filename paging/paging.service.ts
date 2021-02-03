import { Injectable } from '@angular/core';
import { PagingModel } from './paging.model';
import { AppConfig } from 'src/app/app.config.service';

@Injectable()
export class PagingService {
    public itemsPerPage: number[] = AppConfig.Settings.itemsPerPage;
    public pagingDataDefault: PagingModel = {
        CurrentPage: 1,
        PageSize: this.itemsPerPage[0],
        TotalCount: 0,
        TotalPage: 0,
    };

    pageStr: string[] = [];
    getPager(pager: PagingModel): PagingModel {
        // ensure current page isn't out of range
        if (pager.CurrentPage < 1) {
            pager.CurrentPage = 1;
        } else if (pager.CurrentPage > pager.TotalPage) {
            pager.CurrentPage = pager.TotalPage;
        }
        return pager;
    }

    getArrayPages(Pages: number, page: number = 0): string[] {
        this.pageStr = [];
        if (Pages < 5) {
            for (let i = 2; i <= Pages - 1; i++) {
                this.pageStr.push(i.toString());
            }
        } else {
            const min = 1;

            if (page < min + 4) {
                for (let i = 2; i <= page + 2; i++) {
                    if (i < Pages) {
                        this.pageStr.push(i.toString());
                    }
                }
                if (Pages === 5) {
                    if (page === min) {
                        this.pageStr.push('...');
                    }
                } else {
                    if (!(page - 2 === min || page - 3 === min) || !(page + 3 === Pages || page + 2 === Pages)) {
                        this.pageStr.push('...');
                    }
                }
            } else if (page > Pages - 4) {
                if (!((page - 3 === min || page - 2 === min) && (page + 3 === Pages || page + 2 === Pages))) {
                    this.pageStr.push('...');
                }
                for (let i = page - 2; i <= Pages - 1; i++) {
                    if (i < Pages) {
                        this.pageStr.push(i.toString());
                    }
                }

            } else if (page >= min + 4 && page <= Pages - 4) {
                this.pageStr.push('...');
                for (let i = page - 2; i <= page + 2; i++) {
                    this.pageStr.push(i.toString());
                }
                this.pageStr.push('...');
            }
        }
        return this.pageStr;
    }
}
