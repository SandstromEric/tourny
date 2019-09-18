import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
//import { Fixture } from 'src/app/shared/models/sports';
const axios = require('axios');

admin.initializeApp(functions.config().firebase);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const UpdateLiveFixtures = functions.pubsub
    .topic('get-live-fixtures')
    .onPublish(async message => {
        let docIds: number[] = [];
        const db = admin.firestore();
        const snapshot = await db.collection('fixtures').get();
        snapshot.forEach(doc => {
            docIds = docIds.concat(doc.data().fixture_id);
        });

        const headers = {
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
            'X-RapidAPI-Key': '0d44e8e4eemshded77973b5efe08p1a69f2jsn6455426ca907'
        };

        try {
            const payload = await axios.get("https://api-football-v1.p.rapidapi.com/v2/fixtures/live", { headers });
            const data: any[] = payload.data.api.fixtures;
            const findMatches = data.filter(match => docIds.includes(match.fixture_id));

            const batch = db.batch();
            findMatches.map(match => {
                const matchRef = db.doc(`fixtures/${match.fixture_id}`);
                batch.set(matchRef, {
                    ...match,
                    event_date: new Date(match.event_date),
                    event_timestamp: new Date(match.event_timestamp),
                    live: true
                }, { merge: true });
            });
            batch.commit();

        } catch (error) {
            console.log(error);
        }

        return snapshot;
    })

export const UpdateFixtureFulltime = functions.pubsub
    .topic('update-fixture-fulltime')
    .onPublish(async message => {
        let docIds: number[] = [];
        const db = admin.firestore();
        const snapshot = await db.collection('fixtures').where('live', '==', true).get();
        snapshot.forEach(doc => {
            docIds = docIds.concat(doc.data().fixture_id);
        });
        const headers = {
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
            'X-RapidAPI-Key': '0d44e8e4eemshded77973b5efe08p1a69f2jsn6455426ca907'
        };

        const batch = db.batch();
        console.log(docIds);
        for (let id of docIds) {
            try {
                const payload = await axios.get(`https://api-football-v1.p.rapidapi.com/v2/fixtures/id/${id}`, { headers });
                const data: any = payload.data.api.fixtures[0];
                if (data.statusShort === 'FT') {
                    const matchRef = db.doc(`fixtures/${data.fixture_id}`);
                    batch.set(matchRef, {
                        ...data,
                        event_date: new Date(data.event_date),
                        event_timestamp: new Date(data.event_timestamp),
                        live: false
                    }, { merge: true });
                }

            } catch (error) {
                console.log(error);
            }
        }
        batch.commit();
        return snapshot;
    })

