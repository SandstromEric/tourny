import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { map, tap } from 'rxjs/operators';
import { Country, SportResponse, CountriesResponse, LeaguesResponse, League, SeasonsResponse, StandingResponse, FixturesResponse, Fixture } from '../models/sports';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SportService {
    baseUrl = environment.sports.url;
    requestUrl = 'https://' + this.baseUrl + '/v2/';
    headers: HttpHeaders = new HttpHeaders({
        'X-RapidAPI-Host': this.baseUrl,
        'X-RapidAPI-Key': environment.sports.apikey
    });

    constructor(private http: HttpClient) { }

    public getLeagues(finishedSeasons = true): Promise<League[]> {
        return this.getApi<SportResponse<LeaguesResponse>>(`leagues`).pipe(
            map(data => {
                if (!finishedSeasons) return data.api.leagues.filter(league => new Date() < new Date(league.season_end));
                else return data.api.leagues;
            })
        ).toPromise();
    }

    public getLeaguesByCountry(country: string, season: number): Promise<League[]> {
        return this.getApi<SportResponse<LeaguesResponse>>(`leagues/country/${country}/${season}`).pipe(
            map(data => data.api.leagues)
        ).toPromise();
    }

    public getLeagueTable(leagueId: number) {
        return this.getApi<SportResponse<StandingResponse>>(`leagueTable/${leagueId}`).pipe(
            map(data => data.api.standings)
        ).toPromise();
    }

    public getCountries(): Promise<Country[]> {
        return this.getApi<SportResponse<CountriesResponse>>(`countries`).pipe(
            map(data => data.api.countries)
        ).toPromise();
    }

    public getSeasons(): Promise<number[]> {
        return this.getApi<SportResponse<SeasonsResponse>>(`seasons`).pipe(
            map(data => data.api.seasons)
        ).toPromise();
    }

    public getLeagueFixtures(leagueId: number, onlyNext = false): Promise<Fixture[]> {
        return this.getApi<SportResponse<FixturesResponse>>(`fixtures/league/${leagueId}`).pipe(
            map(data => {
                if (onlyNext) return data.api.fixtures.filter(fixture => fixture.statusShort === 'NS')
                else return data.api.fixtures
            })
        ).toPromise()
    }

    private getApi<T>(url: string): Observable<T> {
        return this.http.get<T>(this.requestUrl + url, { headers: this.headers });
    }
}
