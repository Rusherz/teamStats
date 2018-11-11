import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
	public overTimeChart1 = undefined;
	public overTimeChart2 = undefined;
	public season1: string = 'Season 5 2018';
	public season2: string = 'Season 5 2018';
	public maps: string[] = ['Bazaar', 'Cargo', 'Downfall', 'Quarantine', 'Suburbia', 'Subway', 'Tanker']
	public map: string = undefined;
	public teamName: string = undefined;

	@Output() output_season = new EventEmitter();
	@Input() teamNames: string[];
	@Input() url: string;

	constructor(private http: HttpClient) { }

	ngOnInit() {
		this.url += '/charts/overtime';
		this.teamName = this.teamNames[0];
		this.map = this.maps[0];
		this.overTimeChartInit();
	}

	getChartData() {
		this.output_season.emit(this.season1);
		if (this.map != undefined && this.teamName != undefined) {
			this.http.post(this.url, { season: this.season1, mapName: this.map.toLowerCase(), teamName: this.teamName }).subscribe(data => {
				this.overTimeChart1.data.datasets = data['dataPoints'];
				let labels = [];
				for (let label of data['labels']) {
					labels.push(new Date(label['date']).toDateString() + ' ' + label['team'])
				}
				this.overTimeChart1.data.labels = labels;
				this.overTimeChart1.update();
			});
			this.http.post(this.url, { season: this.season2, mapName: this.map.toLowerCase(), teamName: this.teamName }).subscribe(data => {
				this.overTimeChart2.data.datasets = data['dataPoints'];
				let labels = [];
				for (let label of data['labels']) {
					labels.push(new Date(label['date']).toDateString() + ' ' + label['team'])
				}
				this.overTimeChart2.data.labels = labels;
				this.overTimeChart2.update();
			});
		}
	}

	overTimeChartInit() {
		this.http.post(this.url, { season: this.season1, mapName: this.map.toLowerCase(), teamName: this.teamName }).subscribe((data) => {
			let canvas = <HTMLCanvasElement>document.getElementById("overTimeCanvas1");
			let ctx = canvas.getContext("2d");
			let labels = [];
			for (let label of data['labels']) {
				labels.push(new Date(label['date']).toDateString() + ' VS ' + label['team'])
			}
			this.overTimeChart1 = new Chart(ctx, {
				type: 'line',
				data: {
					labels: labels,
					datasets: data['dataPoints']
				},
				options: {
					legend: {
						display: false
					},
					scales: {
						xAxes: [{
							display: false
						}],
						yAxes: [{
							display: true
						}],
					}
				}
			});
		});
		this.http.post(this.url, { season: this.season2, mapName: this.map.toLowerCase(), teamName: this.teamName }).subscribe((data) => {
			let canvas = <HTMLCanvasElement>document.getElementById("overTimeCanvas2");
			let ctx = canvas.getContext("2d");
			let labels = [];
			for (let label of data['labels']) {
				labels.push(new Date(label['date']).toDateString() + ' VS ' + label['team'])
			}
			this.overTimeChart2 = new Chart(ctx, {
				type: 'line',
				data: {
					labels: labels,
					datasets: data['dataPoints']
				},
				options: {
					legend: {
						display: false
					},
					scales: {
						xAxes: [{
							display: false
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
