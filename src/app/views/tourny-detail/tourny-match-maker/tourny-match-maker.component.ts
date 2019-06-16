import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { League, Fixture } from 'src/app/shared/models/sports';
import { MatSelectChange } from '@angular/material';
import { TournamentService } from 'src/app/shared/services/tournament.service';
import { SportService } from 'src/app/shared/services/sport.service';

@Component({
    selector: 'app-tourny-match-maker',
    templateUrl: './tourny-match-maker.component.html',
    styleUrls: ['./tourny-match-maker.component.scss']
})
export class TournyMatchMakerComponent implements OnInit {
    @Input() tourny: any;
    @Input() id: any;
    form: FormGroup

    tourny$: any;
    leagues$: League[] = [];
    matches$: Fixture[] = [];
    pool$: Fixture[] = [];

    constructor(
        private tournyService: TournamentService,
        private sportService: SportService,
        private fb: FormBuilder) {

        this.form = this.fb.group({
            playstyle: [null],
            matchPool: this.fb.array([])
        });
    }

    async ngOnInit() {
        this.form.get('playstyle').valueChanges.subscribe(playstyle => {
            if (this.matches$.length) {
                this.matches$ = [];
                this.pool$ = [];
                this.matchPool.clear();
            }
        });
        this.leagues$ = await this.sportService.getLeagues(false);
    }

    async getLeagueMatches(event: MatSelectChange) {
        if (Array.isArray(event.value)) {
            let promises = [];
            event.value.map(leagueId => {
                promises.push(this.sportService.getLeagueFixtures(leagueId, true));
            });

            let payload = await Promise.all(promises);
            this.matches$ = [].concat(...payload);

        } else {
            this.matches$ = await this.sportService.getLeagueFixtures(event.value, true);
        }
    }

    get matchPool(): FormArray {
        return this.form.get('matchPool') as FormArray;
    }

    get leagues() {
        return this.leagues$.sort((a, b) => a.name.localeCompare(b.name));
    }

    get filteredMatches() {
        return this.matches$.filter(item => !this.matchPool.value.includes(item.fixture_id)).sort((a, b) => {
            if (a.event_date > b.event_date) return 1
            else return -1;
        });
    }

    addToPool(item: Fixture) {
        this.pool$ = [...this.pool$, item];
        this.matchPool.push(this.fb.control(item.fixture_id));
    }

    removeFromPool(item: Fixture, index: number) {
        this.pool$ = this.pool$.filter(match => match.fixture_id !== item.fixture_id);
        this.matchPool.removeAt(index);
    }

    publishTourny() {
        this.tournyService.publishTourny(this.id, this.form.value, this.pool$)
    }

}
