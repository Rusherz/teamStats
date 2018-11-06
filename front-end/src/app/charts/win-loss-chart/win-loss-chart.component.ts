import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'winLossChart',
	templateUrl: './win-loss-chart.component.html',
	styleUrls: ['./win-loss-chart.component.css']
})
export class WinLossChartComponent implements OnInit {

	/*

		TEAM WIN LOSS VARIABLES

	*/
	public roundWinLossChart = undefined;
	public mapWinLossChart = undefined;
	public homeAwayChart = undefined;
	public TeamNames: string[] = [];
	public teamOne: string = undefined;
	public teamTwo: string = undefined;
	public season: string = 'Season 5 2018';

	@Output() output_season = new EventEmitter();
	@Input() url:string;
	@Input() teamNames: string[] = [];
	constructor(private http: HttpClient) {}

	ngOnInit() {
		this.roundWinLossChartInit();
		this.mapWinLossChartInit();
	}

	getChartData() {
		this.output_season.emit(this.season);
		this.TeamNames = [];
		if (this.teamOne && this.teamOne != 'undefined') {
			this.TeamNames.push(this.teamOne)
		}
		if (this.teamTwo && this.teamTwo != 'undefined') {
			this.TeamNames.push(this.teamTwo)
		}
		this.http.post(this.url + '/charts/winloss', { 'season': this.season, 'teamNames': this.TeamNames, 'roundsMaps': 'rounds' }).subscribe(data => {
			this.roundWinLossChart.data.datasets = data;
			if (this.TeamNames.length != 0) {
				this.roundWinLossChart.options.legend.display = true;
			} else {
				this.roundWinLossChart.options.legend.display = false;
			}
			this.roundWinLossChart.update();
		});

		this.http.post(this.url + '/charts/winloss', { 'season': this.season, 'teamNames': this.TeamNames, 'roundsMaps': 'maps' }).subscribe(data => {
			this.mapWinLossChart.data.datasets = data;
			if (this.TeamNames.length != 0) {
				this.mapWinLossChart.options.legend.display = true;
			} else {
				this.mapWinLossChart.options.legend.display = false;
			}
			this.mapWinLossChart.update();
		});
	}

	getMatches(){
		this.http.get(this.url + '/charts').subscribe((result) => {
			this.getChartData();
		});
	}

	roundWinLossChartInit() {
		this.http.post(this.url + '/charts/winloss', { 'season': this.season, 'teamNames': this.TeamNames, 'roundsMaps': 'rounds' }).subscribe(data => {
			let canvas = <HTMLCanvasElement>document.getElementById("roundWinLossCanvas");
			let ctx = canvas.getContext("2d");
			this.roundWinLossChart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: ['Bazaar', 'Cargo', 'Downfall', 'Q1', 'Suburbia', 'Subway', 'Tanker'],
					datasets: data
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

	mapWinLossChartInit() {
		this.http.post(this.url + '/charts/winloss', { 'season': this.season, 'teamNames': this.TeamNames, 'roundsMaps': 'maps' }).subscribe(data => {
			let canvas = <HTMLCanvasElement>document.getElementById("mapWinLossCanvas");
			let ctx = canvas.getContext("2d");
			this.mapWinLossChart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: ['Bazaar', 'Cargo', 'Downfall', 'Q1', 'Suburbia', 'Subway', 'Tanker'],
					datasets: data
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
