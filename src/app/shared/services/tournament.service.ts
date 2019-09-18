import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';
import { switchMap, take, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Fixture } from '../models/sports';
import { combineLatest, forkJoin, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TournamentService {

    constructor(
        private db: AngularFirestore,
        private authService: AuthenticationService,
        private router: Router) {
    }

    get tournies() {
        return this.authService.user$.pipe(
            switchMap(user => this.db.collection('tournaments').valueChanges({ idField: 'id' }).pipe(
                map(tournies => tournies.filter(tourny => !tourny['admins'].includes(user ? user.uid : 'willneverFind')))
            ))
        );
    }

    get myTournies() {
        return this.authService.user$.pipe(
            switchMap(user => this.db.collection('tournaments', ref => ref.where('admins', 'array-contains', user ? user.uid : 'willneverFind')).valueChanges({ idField: 'id' }))
        );
    }

    getTournyDetail(id: string) {
        return this.db.doc(`tournaments/${id}`).valueChanges();
    }

    get competitions() {
        return this.db.collection('competitions').valueChanges();
    }

    async createTourny({ privacy, maxPlayers }) {
        let user = await this.authService.user$.pipe(take(1)).toPromise();
        this.db.collection('tournaments').add({
            privacy,
            maxPlayers,
            createdBy: user.uid,
            admins: [user.uid],
            published: null,
            matchPool: [],
            name: 'New Tournament by ' + user.displayName
        }).then(doc => {
            this.router.navigate(['./tourny', doc.id])
        });

    }

    publishTourny(tournyId: string, form: any, matchpool: Fixture[]) {
        let batch = this.db.firestore.batch();

        const tournyRef = this.db.firestore.collection('tournaments').doc(tournyId);
        batch.set(tournyRef, {
            ...form,
            published: true
        }, { merge: true });

        matchpool.map(match => {
            const matchRef = this.db.firestore.collection('fixtures').doc(`${match.fixture_id}`);
            batch.set(matchRef, {
                ...match,
                event_date: new Date(match.event_date),
                event_timestamp: new Date(match.event_timestamp)
            }, { merge: true });
        });

        batch.commit();
    }

    getTournyFixtures(ids) {
        const reads = ids.map(id => this.db.collection('fixtures').doc(id.toString()).valueChanges());
        return combineLatest(reads);
    }

    getMyPredictions(tournyId: string) {
        return this.authService.user$.pipe(
            switchMap(user => this.db.collection(`tournaments/${tournyId}/participants/${user.uid}/predictions`).valueChanges({ idField: 'id' }))
        )
    }

    getLiveFixtures() {
        return this.db.collection('fixtures', ref => ref.where('live', '==', true)).valueChanges();
    }

    getMatchesToday() {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 999);
        return this.db.collection('fixtures', ref => ref.where('event_date', '>', start).where('event_date', '<', end)).valueChanges();
    }

    async setMatchScores(tournyId: string, fixtureId: number | string, data: any) {
        let user = await this.authService.user$.pipe(take(1)).toPromise();
        this.db.doc(`tournaments/${tournyId}/participants/${user.uid}/predictions/${fixtureId}`).set({
            ...data
        })
    }
}
