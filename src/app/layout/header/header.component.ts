import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/shared/services/general.service';
import { take, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { LoginComponent } from 'src/app/shared/components/login/login.component';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    menuState: boolean;
    mainMenu: any[];
    constructor(private generalService: GeneralService, private dialog: MatDialog, public auth: AuthenticationService) { }

    ngOnInit() {
        this.generalService.getMenuState().subscribe(data => this.menuState = data);
        this.mainMenu = this.generalService.mainMenu;
    }

    setMenuState() {
        this.generalService.setMenuState(!this.menuState);
    }

    login() {
        this.dialog.open(LoginComponent)
    }

}
