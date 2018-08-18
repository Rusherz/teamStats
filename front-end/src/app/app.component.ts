import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { PlatformLocation } from '@angular/common';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	/*

		TEAM WIN LOSS VARIABLES

	*/
	public teamWinLossChart = undefined;
	public teamNames: string[] = [];
	public teamOne: string = undefined;
	public teamTwo: string = undefined;
	public TeamNames: string[] = [];
	public roundsMaps: string = 'rounds';
	public date: Date;
	public season_url: string = undefined;
	public data_string: string = 'Get Older Data';
	public data_loading: boolean = false;
	public season: string = 'season_5_2018';

	/*

		TEAM WIN LOSS OVER TIME

	*/
	public overTimeChart = undefined;

	/*

		GUN STAT VARIABLES

	*/
	public gunStatChart
	public gunName: string = undefined;
	public gun = {
		'damage': 0,
		'magSize': 0,
		'points': 0,
		'rof': 0
	}


	/*

		GLOBAL VARIABLES

	*/
	public isWinLoss: boolean = true;
	public gunNames: string[] = [];

	private url: string = '';
	constructor(private http: HttpClient, platformLocation: PlatformLocation) {
		this.url = 'http://' + (platformLocation as any).location.hostname + ':4000';
	}

	ngOnInit() {
		this.http.get(this.url + '/getLastUpdated?season=' + this.season).subscribe(data => {
			this.date = new Date(data['date']);
		})
		this.http.get(this.url + '/gunNames').subscribe((gunNames: Object[]) => {
			for (let gunName of gunNames) {
				this.gunNames.push(gunName['gun'])
			}
		})
		this.http.get(this.url + '/allTeamNames?season=' + this.season).subscribe((teamNames: Object[]) => {
			for (let teamName of teamNames) {
				this.teamNames.push(teamName['team'])
			}
		});
		this.teamWinLossChartInit();
		this.gunStatChartInit();
		this.overTimeChartInit();
	}

	getChartData() {
		this.TeamNames = [];
		if (this.teamOne && this.teamOne != 'undefined') {
			this.TeamNames.push(this.teamOne)
		}
		if (this.teamTwo && this.teamTwo != 'undefined') {
			this.TeamNames.push(this.teamTwo)
		}
		this.http.post(this.url + '/chartwinloss', { 'season': this.season, 'teamNames': this.TeamNames, 'roundsMaps': this.roundsMaps }).subscribe(data => {
			this.teamWinLossChart.data.datasets = data;
			if (this.data_loading) {
				this.data_loading = false;
				this.data_string = 'Get Older Data';
				this.season_url = undefined;
			}
			if (this.TeamNames.length != 0) {
				this.teamWinLossChart.options.legend.display = true;
			} else {
				this.teamWinLossChart.options.legend.display = false;
			}
			this.teamWinLossChart.update();
		});
	}

	updateData() {
		this.http.get(this.url + '?season=' + this.season).subscribe(data => {
			this.date = new Date(data['date']);
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

	teamWinLossChartInit() {
		this.http.post(this.url + '/chartwinloss', { 'season': this.season, 'teamNames': this.TeamNames, 'roundsMaps': 'rounds' }).subscribe(data => {
			let canvas = <HTMLCanvasElement>document.getElementById("teamWinLossCanvas");
			let ctx = canvas.getContext("2d");
			this.teamWinLossChart = new Chart(ctx, {
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

	overTimeChartInit(){
		this.http.get(this.url + '/overtime').subscribe(data => {
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

	gunStatChartInit() {
		this.http.get(this.url + '/gunstats').subscribe(data => {
			let canvas = <HTMLCanvasElement>document.getElementById("gunStatCanvas");
			let ctx = canvas.getContext("2d");
			this.gunStatChart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: ['Points', 'Damage', 'RoF', 'DPS'],
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

	gunStatUpdate() {
		this.http.get(this.url + '/gunstats').subscribe(data => {
			this.gunStatChart.data.datasets = data;
			this.gunStatChart.update()
		})
	}

	getGunStats() {
		this.http.post(this.url + '/gunstats', { gunName: this.gunName }).subscribe(result => {
			this.gun['damage'] = result['damage'];
			this.gun['magSize'] = result['magSize'];
			this.gun['points'] = result['points'];
			this.gun['rof'] = result['rof'];
		});
	}

	updateGunStats() {
		this.http.post(this.url + '/updategunstats', { gunName: this.gunName, gun: this.gun }).subscribe(result => {
			this.gunStatUpdate();
		});
	}
}
