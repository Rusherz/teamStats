import { Component } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SERVER_TRANSITION_PROVIDERS } from '@angular/platform-browser/src/browser/server-transition';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	public showChart: number = 0;

	public teamNames: string[] = [];

	public season: string = 'season_5_2018';

	private url: string = '';
	constructor(private http: HttpClient, platformLocation: PlatformLocation) {
		this.url = 'http://' + (platformLocation as any).location.hostname + ':4000';
	}

	ngOnInit() {
		this.http.get(this.url + '/allTeamNames?season=' + this.season).subscribe((names: Object[]) => {
			this.teamNames = [];
			for (let teamName of names) {
				this.teamNames.push(teamName['team'])
			}
		});
	}

	setSeason(season: string){
		if(this.season == season) return;
		this.season = season;
		this.http.get(this.url + '/allTeamNames?season=' + this.season).subscribe((names: Object[]) => {
			this.teamNames = [];
			for (let teamName of names) {
				this.teamNames.push(teamName['team'])
			}
		});
	}

}
