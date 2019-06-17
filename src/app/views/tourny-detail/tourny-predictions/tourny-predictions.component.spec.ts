import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournyPredictionsComponent } from './tourny-predictions.component';

describe('TournyPredictionsComponent', () => {
  let component: TournyPredictionsComponent;
  let fixture: ComponentFixture<TournyPredictionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournyPredictionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournyPredictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
