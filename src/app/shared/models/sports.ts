export interface SportResponse<T> {
    api: T;
}

export interface CountriesResponse {
    resluts: number;
    countries: Country[];
}

export interface Country {
    country: string;
    code: string;
    flag: string;
}

export interface SeasonsResponse {
    resluts: number;
    seasons: number[];
}

export interface LeaguesResponse {
    results: number;
    leagues: League[];
}

export interface League {
    league_id: number;
    name: string;
    country: string;
    country_code: string;
    season: number;
    season_start: string;
    season_end: string;
    logo: string;
    flag: string;
    standings: number;
    is_current: number;
}

export interface StandingResponse {
    resuluts: number;
    standings: Array<Array<Team>>;
}

export interface Group {
    rank: number;
    team_id: number;
}

export interface Team {
    rank: number;
    team_id: number;
    teamName: string;
    logo: string;
    group: string;
    forme: string;
    description: string;
    all: TeamStats;
    home: TeamStats;
    away: TeamStats;
    goalsDiff: number;
    points: number;
    lastUpdate: string;
}

export interface TeamStats {
    matchsPlayed: number;
    win: number;
    draw: number;
    lose: number;
    goalsFor: number;
    goalsAgainst: number;
}