import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {
    private menuOpenStateSubject = new BehaviorSubject(true);

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
                path: ['tournies']
            },
            {
                name: 'Leagues',
                icon: 'fas:futbol',
                path: ['leagues']
            }
        ]
    }
}
