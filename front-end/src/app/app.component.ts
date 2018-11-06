import { Component } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	public showChart: number = 2;

	public teamNames: string[] = [];

	public season: string = 'Season 5 2018';

	public user: Object = {
		username: '',
		password: '',
		email: ''
	}

	private url: string = '';
	constructor(private http: HttpClient, platformLocation: PlatformLocation) {
		this.url = 'http://' + (platformLocation as any).location.hostname + ':4000/api';
	}

	ngOnInit() {
		this.http.get(this.url + '/charts/allTeamNames?season=' + this.season).subscribe((names: Object[]) => {
			this.teamNames = [];
			for (let teamName of names) {
				this.teamNames.push(teamName['team'])
			}
		});
	}

	setSeason(season: string){
		if(this.season == season) return;
		this.season = season;
		this.http.get(this.url + '/charts/allTeamNames?season=' + this.season).subscribe((names: Object[]) => {
			this.teamNames = [];
			for (let teamName of names) {
				this.teamNames.push(teamName['team'])
			}
		});
	}

	createUser(){
		this.http.post(this.url + '/users', this.user).subscribe((result) => {
			console.log(result);
		})
	}
}
