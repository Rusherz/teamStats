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

		GUN STAT VARIABLES

	*/
	public gunStatChart

	private url: string = '';
	constructor(private http: HttpClient, platformLocation: PlatformLocation) {
		this.url = 'http://' + (platformLocation as any).location.hostname;
	}

	ngOnInit() {
		this.http.get(this.url + ':4000/getLastUpdated?season=' + this.season).subscribe(data => {
			this.date = new Date(data['DATE']);
		})
		this.http.get(this.url + ':4000/gunStats').subscribe(data => {
			
		})
		this.http.get(this.url + ':4000/allTeamNames?season=' + this.season).subscribe((teamNames: Object[]) => {
			for (let teamName of teamNames) {
				this.teamNames.push(teamName['team'])
			}
		});
		this.teamWinLossChartInit();
		this.gunStatChartInit();
	}

	getChartData() {
		this.TeamNames = [];
		if (this.teamOne && this.teamOne != 'undefined') {
			this.TeamNames.push(this.teamOne)
		}
		if (this.teamTwo && this.teamTwo != 'undefined') {
			this.TeamNames.push(this.teamTwo)
		}
		this.http.post(this.url + ':4000/chartwinloss', {'season': this.season, 'teamNames': this.TeamNames, 'roundsMaps': this.roundsMaps }).subscribe(data => {
			this.teamWinLossChart.data.datasets = data;
			if (this.data_loading) {
				this.data_loading = false;
				this.data_string = 'Get Older Data';
				this.season_url = undefined;
			}
			if (this.TeamNames.length > 1 && this.TeamNames.length != 0) {
				this.teamWinLossChart.options.legend.display = true;
			} else {
				this.teamWinLossChart.options.legend.display = false;
			}
			this.teamWinLossChart.update();
		});
	}

	updateData() {
		this.http.get(this.url + ':4000?season=' + this.season).subscribe(data => {
			this.date = new Date(data['DATE']);
			this.getChartData();
		});
	}

	getOlderData() {
		this.data_loading = true;
		this.data_string = 'Loading...';
		this.http.post(this.url + ':4000/seasonData', {
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
		this.http.post(this.url + ':4000/chartwinloss', {'season': this.season, 'teamNames': this.TeamNames, 'roundsMaps': 'rounds' }).subscribe(data => {
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

	gunStatChartInit(){
		this.http.get(this.url + ':4000/gunstats').subscribe(data => {
			let canvas = <HTMLCanvasElement>document.getElementById("gunStatCanvas");
			let ctx = canvas.getContext("2d");
			this.gunStatChart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: ['Points', 'Damage', 'Mag Cap', 'RoF', 'DPS'],
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
