import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../shared/services/general.service';
import { Observable } from 'rxjs';
import { Router, NavigationEnd, Route } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-views',
    templateUrl: './views.component.html',
    styleUrls: ['./views.component.scss']
})
export class ViewsComponent implements OnInit {
    menuState$: Observable<boolean>;
    routeHierarchy: { name: string, path: string[] }[] = [];
    mainMenu: any[];

    constructor(private generalService: GeneralService, private router: Router) { }

    ngOnInit() {
        this.menuState$ = this.generalService.getMenuState();
        this.mainMenu = this.generalService.mainMenu;
        this.router.events.pipe(
            filter(e => e instanceof NavigationEnd)
        ).subscribe(event => {
            this.routeHierarchy = [];
            let url = event['urlAfterRedirects'].split('/'); url.shift();
            this.buildHierarchy(url, this.router.config);
        })

    }

    buildHierarchy(url: string[], tree: Route[], currentLink = ['/']) {
        if (url.length) {
            const match = tree.find(item => url[0] === item.path);
            currentLink = [...currentLink, url[0]];

            if (match) {
                this.routeHierarchy.push({ name: match.path, path: currentLink });
                url.shift();

                if (match.children) {
                    return this.buildHierarchy(url, match.children, currentLink);
                }
            }

            const wildcard = tree.find(item => item.path.charAt(0) === ':');
            if (wildcard) {
                this.routeHierarchy.push({ name: url[0], path: currentLink })
                url.shift();

                if (wildcard.children) {
                    return this.buildHierarchy(url, wildcard.children, currentLink);
                }
            }
        }
    }
}
