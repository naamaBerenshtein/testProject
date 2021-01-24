import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { HttpModule } from '@angular/http';
import { PagerService } from './shared/pager.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatirialModule } from './matirial-module/matirial.module';
import { AnalysisComponent } from './analysis/analysis.component';
import { DataComponent } from './data/data.component';
import { MenitorComponent } from './menitor/menitor.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { DataService } from './dataBase/data.service';
import { AddDataComponent } from './add-data/add-data.component';
// import { ToolBarComponent } from './tool-bar/tool-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    AnalysisComponent,
    DataComponent,
    MenitorComponent,
    ToolBarComponent,
    AddDataComponent
    // ToolBarComponent
  ],
  imports: [
    SharedModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot([
      { path: 'analysis', component: AnalysisComponent },
      { path: 'menitor', component: MenitorComponent },
      { path: 'data', component: DataComponent },
      { path: 'filterData/:Filter', component: DataComponent },




    ]),
    NoopAnimationsModule,
    MatirialModule
  ],entryComponents:[AddDataComponent],
  providers: [PagerService,DataService],
  bootstrap: [AppComponent],
  exports: [MatirialModule, SharedModule]
})
export class AppModule { }
