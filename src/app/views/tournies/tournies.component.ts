import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/shared/services/tournament.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { MatDialog } from '@angular/material';
import { DialogCreateTournyComponent } from 'src/app/shared/components/dialog-create-tourny/dialog-create-tourny.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tournies',
    templateUrl: './tournies.component.html',
    styleUrls: ['./tournies.component.scss']
})
export class TourniesComponent implements OnInit {
    myTournaments$: any;
    tournaments$: any;
    user = null;
    constructor(
        private tournyService: TournamentService,
        private authService: AuthenticationService,
        private dialog: MatDialog,
        private router: Router) {

    }

    ngOnInit() {
        this.tournaments$ = this.tournyService.tournies;
        this.myTournaments$ = this.tournyService.myTournies;
        this.authService.user$.subscribe(user => this.user = user);
    }

    createTourny() {
        this.dialog.open(DialogCreateTournyComponent)
    }

    gotoTourny(tourny: any) {
        this.router.navigate(['./tourny', tourny.id])
    }

}
