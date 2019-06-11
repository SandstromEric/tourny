import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateTournyComponent } from './dialog-create-tourny.component';

describe('DialogCreateTournyComponent', () => {
  let component: DialogCreateTournyComponent;
  let fixture: ComponentFixture<DialogCreateTournyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCreateTournyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateTournyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
