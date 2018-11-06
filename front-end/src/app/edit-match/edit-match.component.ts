import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'editMatch',
	templateUrl: './edit-match.component.html',
	styleUrls: ['./edit-match.component.css']
})
export class EditMatchComponent implements OnInit {

	constructor(private http: HttpClient) { }

	@Input() url: string;

	public match: Object = undefined;
	public editIndex: number = -1;
	public matches: Object[];

	ngOnInit() {
		this.url += '/matches';
		this.http.get(this.url).subscribe((results: Object[]) => {
			this.matches = results;
		})
	}

	titleCaseWord(word: string) {
		return word[0].toUpperCase() + word.substr(1);
	}

	selectMatch() {
		if (this.editIndex == -1) {
			this.match = undefined;
			return;
		} else {
			this.match = Object.assign({}, this.matches[this.editIndex]);
		}
	}

	onSaveMatch() {
		this.http.patch(this.url + '/' + this.match['_id'], Object.assign({}, this.match)).subscribe((results) => {
			this.match = undefined;
			this.editIndex = -1;
			console.log(results)
		});
	}

}
