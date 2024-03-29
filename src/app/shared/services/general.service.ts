import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {
    private menuOpenStateSubject = new BehaviorSubject(false);

    constructor() { }

    public getMenuState() {
        return this.menuOpenStateSubject.asObservable();
    }

    public setMenuState(state: boolean) {
        this.menuOpenStateSubject.next(state)
    }

    public get mainMenu() {
        return [
            {
                name: 'Dashboard',
                icon: 'fas:columns',
                path: ['dashboard']
            },
            {
                name: 'Tournies',
                icon: 'fas:trophy',
                path: ['tourny/list']
            },
            {
                name: 'Leagues',
                icon: 'fas:futbol',
                path: ['leagues']
            }
        ]
    }
}
