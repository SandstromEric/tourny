import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TournamentService } from '../../services/tournament.service';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-dialog-create-tourny',
    templateUrl: './dialog-create-tourny.component.html',
    styleUrls: ['./dialog-create-tourny.component.scss']
})
export class DialogCreateTournyComponent implements OnInit {
    form: FormGroup;
    competitions$: any;
    maxPlayers = [4, 8, 12, 16, 20, 24, 28, 32]
    constructor(private fb: FormBuilder, private tournyService: TournamentService, private dialogRef: MatDialogRef<DialogCreateTournyComponent>) { }

    ngOnInit() {
        this.competitions$ = this.tournyService.competitions;
        this.form = this.fb.group({
            privacy: [0],
            maxPlayers: [4]
        })
    }

    create() {
        this.tournyService.createTourny(this.form.value)
        this.dialogRef.close();
    }

}
