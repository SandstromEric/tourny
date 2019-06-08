import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    public user$: Observable<User>;

    constructor(private fireAuth: AngularFireAuth, private firestore: AngularFirestore) {
        this.user$ = this.fireAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            })
        )
    }

    async googleSignin() {
        const provider = new auth.GoogleAuthProvider();
        const credential = await this.fireAuth.auth.signInWithPopup(provider);
        return this.updateUserData(credential.user);
    }

    async signOut() {
        this.fireAuth.auth.signOut();
    }

    private updateUserData({ uid, email, displayName, photoURL }: User) {
        const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${uid}`);

        const data = {
            uid,
            email,
            displayName,
            photoURL
        }

        return userRef.set(data, { merge: true });
    }
}
