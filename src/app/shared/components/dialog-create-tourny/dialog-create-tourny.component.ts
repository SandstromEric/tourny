import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TournamentService } from '../../services/tournament.service';

@Component({
    selector: 'app-dialog-create-tourny',
    templateUrl: './dialog-create-tourny.component.html',
    styleUrls: ['./dialog-create-tourny.component.scss']
})
export class DialogCreateTournyComponent implements OnInit {
    form: FormGroup;
    competitions$: any;

    constructor(private fb: FormBuilder, private tournyService: TournamentService) { }

    ngOnInit() {
        this.competitions$ = this.tournyService.competitions;
        this.form = this.fb.group({

        })
    }

}
