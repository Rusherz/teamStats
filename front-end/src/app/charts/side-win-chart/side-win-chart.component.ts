import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'sideWinChart',
  templateUrl: './side-win-chart.component.html',
  styleUrls: ['./side-win-chart.component.css']
})
export class SideWinChartComponent implements OnInit {

  public sideWinChart = undefined;
  public season: string = 'Season 5 2018';

  @Output() output_season = new EventEmitter();
  @Input() url: string;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.url += '/charts/sidewin';
    this.sideWinChartInit();
  }

  getChartData() {
    this.output_season.emit(this.season);
    this.http.post(this.url, { 'season': this.season }).subscribe(data => {
      this.sideWinChart.data.datasets = data;
      this.sideWinChart.update();
    });
  }

  sideWinChartInit() {
    this.http.post(this.url, { 'season': this.season }).subscribe(data => {
      console.log(data);
      let canvas = <HTMLCanvasElement>document.getElementById("sideWinCanvas");
      let ctx = canvas.getContext("2d");
      this.sideWinChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Bazaar', 'Cargo', 'Downfall', 'Q1', 'Suburbia', 'Subway', 'Tanker'],
          datasets: data
        },
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
  }

}
