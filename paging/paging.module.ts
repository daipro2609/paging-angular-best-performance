import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PagingComponent } from './paging.component';
import { PagingService } from './paging.service';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    declarations: [PagingComponent],
    exports: [PagingComponent],
    providers: [PagingService],
})
export class PagingModule {}
