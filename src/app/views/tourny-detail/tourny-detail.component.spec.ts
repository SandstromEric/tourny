import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournyDetailComponent } from './tourny-detail.component';

describe('TournyDetailComponent', () => {
  let component: TournyDetailComponent;
  let fixture: ComponentFixture<TournyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
