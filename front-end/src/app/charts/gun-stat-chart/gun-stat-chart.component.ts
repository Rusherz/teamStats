import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'gunStatChart',
	templateUrl: './gun-stat-chart.component.html',
	styleUrls: ['./gun-stat-chart.component.css']
})
export class GunStatChartComponent implements OnInit {

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
	public gunNames: string[] = [];

	@Input() url: string;

	constructor(private http: HttpClient) { }

	ngOnInit() {
		this.http.get(this.url + '/guns/gunNames').subscribe((gunNames: Object[]) => {
			for (let gunName of gunNames) {
				this.gunNames.push(gunName['gun'])
			}
		})
		this.gunStatChartInit();
	}

	gunStatChartInit() {
		this.http.get(this.url + '/guns').subscribe(data => {
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
		this.http.get(this.url + '/guns').subscribe(data => {
			this.gunStatChart.data.datasets = data;
			this.gunStatChart.update()
		})
	}

	getGunStats() {
		this.http.post(this.url + '/guns', { gunName: this.gunName }).subscribe(result => {
			this.gun['damage'] = result['damage'];
			this.gun['magSize'] = result['magSize'];
			this.gun['points'] = result['points'];
			this.gun['rof'] = result['rof'];
		});
	}

	updateGunStats() {
		this.http.patch(this.url + '/guns', { gunName: this.gunName, gun: this.gun }).subscribe(result => {
			this.gunStatUpdate();
		});
	}

}
