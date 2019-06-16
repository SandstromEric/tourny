import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournyMatchMakerComponent } from './tourny-match-maker.component';

describe('TournyMatchMakerComponent', () => {
  let component: TournyMatchMakerComponent;
  let fixture: ComponentFixture<TournyMatchMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournyMatchMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournyMatchMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
