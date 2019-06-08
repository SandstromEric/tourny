import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Directive({
    selector: '[auth]'
})
export class AuthenticationDirective {
    private hasView = false;
    constructor(private authService: AuthenticationService, private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }

    @Input() set auth(condition: boolean) {
        if (!condition && !this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        } else if (condition && this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
        }
    }

    /* async getAuth() {
        this.authService.
    } */
}
