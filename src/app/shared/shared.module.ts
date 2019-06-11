import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './material/material.module';
import { AuthenticationDirective } from './directives/authentication.directive';
import { DialogCreateTournyComponent } from './components/dialog-create-tourny/dialog-create-tourny.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ],
    declarations: [LoginComponent, AuthenticationDirective, DialogCreateTournyComponent],
    exports: [LoginComponent, DialogCreateTournyComponent, ReactiveFormsModule, FormsModule],
    entryComponents: [LoginComponent, DialogCreateTournyComponent]
})
export class SharedModule { }
