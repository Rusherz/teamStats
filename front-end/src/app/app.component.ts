import { Component } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	public showChart: number = 0;

	public teamNames: string[] = [];

	private url: string = '';
	constructor(private http: HttpClient, platformLocation: PlatformLocation) {
		this.url = 'http://' + (platformLocation as any).location.hostname + ':4000';
	}

	ngOnInit() {
		this.http.get(this.url + '/allTeamNames?season=season_5_2018').subscribe((teamNames: Object[]) => {
			for (let teamName of teamNames) {
				this.teamNames.push(teamName['team'])
			}
		});
	}

}
