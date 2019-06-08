import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './material/material.module';
import { AuthenticationDirective } from './directives/authentication.directive';

@NgModule({
    declarations: [LoginComponent, AuthenticationDirective],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [LoginComponent],
    entryComponents: [LoginComponent]
})
export class SharedModule { }
