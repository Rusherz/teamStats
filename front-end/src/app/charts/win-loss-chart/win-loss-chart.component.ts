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
	public date: Date;
	public season_url: string = undefined;
	public data_string: string = 'Get Older Data';
	public data_loading: boolean = false;
	public season: string = 'season_5_2018';

	@Output() output_season = new EventEmitter();
	@Input() url:string;
	@Input() teamNames: string[] = [];
	constructor(private http: HttpClient) {}

	ngOnInit() {
		this.http.get(this.url + '/getLastUpdated?season=' + this.season).subscribe(data => {
			this.date = new Date(data['date']);
		})
		this.roundWinLossChartInit();
		this.mapWinLossChartInit();
		this.homeAwayChartInit();
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
		this.http.post(this.url + '/chartwinloss', { 'season': this.season, 'teamNames': this.TeamNames, 'roundsMaps': 'rounds' }).subscribe(data => {
			this.roundWinLossChart.data.datasets = data;
			if (this.data_loading) {
				this.data_loading = false;
				this.data_string = 'Get Older Data';
				this.season_url = undefined;
			}
			if (this.TeamNames.length != 0) {
				this.roundWinLossChart.options.legend.display = true;
			} else {
				this.roundWinLossChart.options.legend.display = false;
			}
			this.roundWinLossChart.update();
		});

		this.http.post(this.url + '/chartwinloss', { 'season': this.season, 'teamNames': this.TeamNames, 'roundsMaps': 'maps' }).subscribe(data => {
			this.mapWinLossChart.data.datasets = data;
			if (this.data_loading) {
				this.data_loading = false;
				this.data_string = 'Get Older Data';
				this.season_url = undefined;
			}
			if (this.TeamNames.length != 0) {
				this.mapWinLossChart.options.legend.display = true;
			} else {
				this.mapWinLossChart.options.legend.display = false;
			}
			this.mapWinLossChart.update();
		});

		this.http.post(this.url + '/homeaway', {'season': this.season}).subscribe(data => {
			this.homeAwayChart.data.datasets = data;
			this.homeAwayChart.update();
		});
	}

	updateData() {
		this.http.get(this.url + '?season=' + this.season).subscribe((data: string) => {
			this.date = new Date(data);
			this.getChartData();
		});
	}

	getOlderData() {
		this.data_loading = true;
		this.data_string = 'Loading...';
		this.http.post(this.url + '/seasonData', {
			'season': this.season,
			seasonUrl: this.season_url
		}).subscribe(data => {
			if (data['result'] == 'done') {
				if (this.data_loading) {
					this.data_loading = false;
					this.data_string = 'Get Older Data';
					this.season_url = undefined;
				}
				//this.updateData();
			}
		})
	}

	roundWinLossChartInit() {
		this.http.post(this.url + '/chartwinloss', { 'season': this.season, 'teamNames': this.TeamNames, 'roundsMaps': 'rounds' }).subscribe(data => {
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
		this.http.post(this.url + '/chartwinloss', { 'season': this.season, 'teamNames': this.TeamNames, 'roundsMaps': 'maps' }).subscribe(data => {
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

	homeAwayChartInit(){
		this.http.post(this.url + '/homeaway', {'season': this.season}).subscribe(data => {
			let canvas = <HTMLCanvasElement>document.getElementById("homeAwayCanvas");
			let ctx = canvas.getContext("2d");
			this.homeAwayChart = new Chart(ctx, {
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
