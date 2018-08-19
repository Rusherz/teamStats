import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'overTimeChart',
	templateUrl: './over-time-chart.component.html',
	styleUrls: ['./over-time-chart.component.css']
})
export class OverTimeChartComponent implements OnInit {

	/*
  
		  TEAM WIN LOSS OVER TIME
  
	  */
	public overTimeChart = undefined;
	public season: string = "season_5_2018";
	public maps: string[] = ['Bazaar', 'Cargo', 'Downfall', 'Quarentine', 'Suburbia', 'Subway', 'Tanker']
	public map: string = undefined;
	public teamName: string = undefined;
	public isInited: boolean = false;

	@Input() teamNames: string[];
	@Input() url: string;

	constructor(private http: HttpClient) { }

	ngOnInit() {
	}

	getChartData() {
		if (this.map != undefined && this.teamName != undefined) {
			if (this.isInited) {
				this.http.post(this.url + '/overtime', { season: this.season, mapName: this.map.toLowerCase(), teamName: this.teamName }).subscribe(data => {
					this.overTimeChart.data.datasets = data['dataPoints'];
					this.overTimeChart.data.labels = data['labels'];
					this.overTimeChart.update();
				});
			} else {
				this.isInited = true;
				this.overTimeChartInit();
			}
		}
	}

	overTimeChartInit() {
		this.http.post(this.url + '/overtime', { season: this.season, mapName: this.map.toLowerCase(), teamName: this.teamName }).subscribe(data => {
			console.log(data);
			let canvas = <HTMLCanvasElement>document.getElementById("overTimeCanvas");
			let ctx = canvas.getContext("2d");
			this.overTimeChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: data['labels'],
					datasets: data['dataPoints']
				},
				options: {
					legend: {
						display: false
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
