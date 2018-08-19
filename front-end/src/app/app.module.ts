import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WinLossChartComponent } from './src/app/charts/win-loss-chart/win-loss-chart.component';
import { GunStatChartComponent } from './src/app/charts/gun-stat-chart/gun-stat-chart.component';
import { OverTimeChartComponent } from './src/app/charts/over-time-chart/over-time-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    WinLossChartComponent,
    GunStatChartComponent,
    OverTimeChartComponent
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
