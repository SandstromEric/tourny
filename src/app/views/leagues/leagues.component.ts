import { Component, OnInit } from '@angular/core';
import { SportService } from 'src/app/shared/services/sport.service';
import { Country, League, Team } from 'src/app/shared/models/sports';
import { MatSelectChange, MatTableDataSource, MatTab } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-leagues',
    templateUrl: './leagues.component.html',
    styleUrls: ['./leagues.component.scss']
})
export class LeaguesComponent implements OnInit {
    form: FormGroup;
    contries: Country[] = [];
    leagues: League[] = [];
    seasons: number[] = [];
    displayedColumns = ['rank', 'team', 'played', 'win', 'draw', 'lose', 'goalsFor', 'goalsAgainst', 'goalsDiff', 'points']
    leagueTables;

    constructor(private sportService: SportService, private fb: FormBuilder) {
        this.form = this.fb.group({
            country: [null],
            season: [null]
        });
    }

    async ngOnInit() {
        this.contries = await this.sportService.getCountries();
        this.seasons = await this.sportService.getSeasons();

        this.form.valueChanges.subscribe(({ country, season }) => {
            if (country && season) {
                this.getLeagues(country, season)
            }
        })
    }

    async getLeagues(country: string, season: number) {
        this.leagues = await this.sportService.getLeaguesByCountry(country, season);
    }

    async getLeagueTable(event: MatSelectChange) {
        this.leagueTables = [];
        let tables = await this.sportService.getLeagueTable(event.value);
        //tables.map(table => this.leagueTables.push(new MatTableDataSource(table)));
        this.leagueTables = new MatTableDataSource(tables[0])
        console.log(this.leagueTables)
    }

}
