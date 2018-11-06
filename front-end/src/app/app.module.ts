import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WinLossChartComponent } from './charts/win-loss-chart/win-loss-chart.component';
import { OverTimeChartComponent } from './charts/over-time-chart/over-time-chart.component';
import { EditMatchComponent } from './edit-match/edit-match.component';
import { SideWinChartComponent } from './charts/side-win-chart/side-win-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    WinLossChartComponent,
    OverTimeChartComponent,
    EditMatchComponent,
    SideWinChartComponent
  ],
  imports: [
    BrowserModule,
		FormsModule,
		ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
