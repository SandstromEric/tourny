import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/shared/services/tournament.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(private tournamentService: TournamentService) { }

    ngOnInit() {
        this.tournamentService.getLiveFixtures().subscribe(data => console.log(data))
        this.tournamentService.getMatchesToday().subscribe(data => console.log(data))
    }

}
