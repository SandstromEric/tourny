import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faTrophy, faColumns, faFutbol } from '@fortawesome/free-solid-svg-icons';


@Injectable({
    providedIn: 'root'
})
export class IconService {
    icons: IconDefinition[] = [faTrophy, faColumns, faFutbol];
    constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
        this.icons.map(item => this.addSvg(item));
    }

    addSvg(icon: IconDefinition) {
        // need to re-assemble the SVG XML
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${icon.icon[0]} ${icon.icon[1]}"><path d="${icon.icon[4]}" /></svg>;` // use template strings
        // consider adding a duplicate check here so you don't do this twice
        this.iconRegistry.addSvgIconLiteralInNamespace(
            icon.prefix, // prefix here is optional, implement as needed
            icon.iconName,
            this.sanitizer.bypassSecurityTrustHtml(svg)
        );
    }
}
