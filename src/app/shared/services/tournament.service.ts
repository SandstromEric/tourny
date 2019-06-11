import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TournamentService {

    constructor(private firestore: AngularFirestore, private authService: AuthenticationService) { }

    get tournies() {
        return this.firestore.collection('tournaments').valueChanges()
    }

    get myTournies() {
        return this.authService.user$.pipe(
            switchMap(user => this.firestore.collection('tournaments', ref => ref.where('admin', '==', user.uid)).valueChanges())
        );
    }

    get competitions() {
        return this.firestore.collection('competitions').valueChanges();
    }
}
