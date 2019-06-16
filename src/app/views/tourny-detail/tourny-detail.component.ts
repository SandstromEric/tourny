import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { TournamentService } from 'src/app/shared/services/tournament.service';
import { SportService } from 'src/app/shared/services/sport.service';
import { League, Fixture } from 'src/app/shared/models/sports';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { of, combineLatest } from 'rxjs';

@Component({
    selector: 'app-tourny-detail',
    templateUrl: './tourny-detail.component.html',
    styleUrls: ['./tourny-detail.component.scss']
})
export class TournyDetailComponent implements OnInit {
    tourny$: any;
    matches$: any;
    id: number;

    constructor(
        private route: ActivatedRoute,
        private tournyService: TournamentService,
        private sportService: SportService,
        private fb: FormBuilder
    ) {

    }

    async ngOnInit() {

        this.tourny$ = this.route.params.pipe(
            tap(({ id }) => this.id = id),
            switchMap(({ id }) => this.tournyService.getTournyDetail(id)),
            tap((tourny: any) => this.matches$ = this.tournyService.getTournyFixtures(tourny.matchPool))
        );

        //this.matches$ = combineLatest([of(2), of(3)])
    }



}
