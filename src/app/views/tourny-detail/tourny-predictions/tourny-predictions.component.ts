import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { TournamentService } from 'src/app/shared/services/tournament.service';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-tourny-predictions',
    templateUrl: './tourny-predictions.component.html',
    styleUrls: ['./tourny-predictions.component.scss']
})
export class TournyPredictionsComponent implements OnInit {
    @Input() matches: any[];
    @Input() id: string;

    form: FormGroup;

    constructor(private fb: FormBuilder, private tournamentService: TournamentService) {
        this.form = this.fb.group({
            predictions: this.fb.array([])
        })
    }

    ngOnInit() {
        this.tournamentService.getMyPredictions(this.id).subscribe(predictions => {
            predictions.map((p: any) => {
                let control = this.predictions.controls.find(control => control.value.fixture_id === p.fixture_id);
                control.patchValue(p);
            })
        })

        this.predictions.valueChanges.pipe(debounceTime(200)).subscribe(data => {
            let control = this.predictions.controls.find(control => control.dirty);
            if (control && control.valid) {
                this.tournamentService.setMatchScores(this.id, control.value.fixture_id, control.value);
            }
            this.predictions.markAsPristine();
        })

    }

    ngOnChanges(changes: SimpleChanges): void {
        const matches = changes.matches.currentValue;
        if (!matches) return
        matches.map(() => this.addPrediction())
        this.predictions.patchValue(matches);
    }

    addPrediction() {
        let group = this.fb.group({
            home: [null, [Validators.required, Validators.min(0)]],
            away: [null, [Validators.required, Validators.min(0)]],
            fixture_id: [null]
        });

        this.predictions.push(group);
    }

    get predictions(): FormArray {
        return this.form.get('predictions') as FormArray;
    }

    getMatch(i) {
        return this.matches[i];
    }

    setScores() {
        //this.tournamentService.setMatchScores()
    }



}
