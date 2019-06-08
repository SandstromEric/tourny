import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewsComponent } from './views.component';
import { LayoutModule } from '../layout/layout.module';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material/material.module';
import { IconService } from '../shared/services/icon.service';
import { TourniesComponent } from './tournies/tournies.component';
import { LeaguesComponent } from './leagues/leagues.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    {
        path: 'tournies', component: TourniesComponent
    },
    {
        path: 'leagues', component: LeaguesComponent
    },
    { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
]

@NgModule({
    declarations: [
        DashboardComponent,
        ViewsComponent,
        TourniesComponent,
        LeaguesComponent
    ],
    imports: [
        CommonModule,
        LayoutModule,
        RouterModule.forRoot(routes),
        MaterialModule
    ],
    exports: [ViewsComponent]
})
export class ViewsModule {
    constructor(iconService: IconService) { }
}
