import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { map, tap } from 'rxjs/operators';
import { Country, SportResponse, CountriesResponse, LeaguesResponse, League, SeasonsResponse, StandingResponse } from '../models/sports';

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

    /* getleagues() {
        return this.http.get<SportResponse>(this.requestUrl + 'leagues/country/sweden/2019', { headers: this.headers }).pipe(
            map(data => data.api)
        ).toPromise();
    } */

    getLeaguesByCountry(country: string, season: number): Promise<League[]> {
        return this.http.get<SportResponse<LeaguesResponse>>(this.requestUrl + `leagues/country/${country}/${season}`, { headers: this.headers }).pipe(
            map(data => data.api.leagues)
        ).toPromise();
    }

    getLeagueTable(leagueId: number) {
        return this.http.get<SportResponse<StandingResponse>>(this.requestUrl + `leagueTable/${leagueId}`, { headers: this.headers }).pipe(
            map(data => data.api.standings)
        ).toPromise();
    }

    getCountries(): Promise<Country[]> {
        return this.http.get<SportResponse<CountriesResponse>>(this.requestUrl + `countries`, { headers: this.headers }).pipe(
            map(data => data.api.countries)
        ).toPromise();
    }

    getSeasons(): Promise<number[]> {
        return this.http.get<SportResponse<SeasonsResponse>>(this.requestUrl + `seasons`, { headers: this.headers }).pipe(
            map(data => data.api.seasons)
        ).toPromise();
    }
}
