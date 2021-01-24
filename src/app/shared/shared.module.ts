import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderByPipe } from './OrderBy.pipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatirialModule } from '../matirial-module/matirial.module';
import { ToolBarComponent } from '../tool-bar/tool-bar.component';
@NgModule({
    declarations: [
    
        OrderByPipe
    ],
    imports: [
        FormsModule,
        CommonModule,
        MatirialModule,
        RouterModule,
      

    ],
    exports: [OrderByPipe, FormsModule, CommonModule, MatirialModule]

})
export class SharedModule { }
