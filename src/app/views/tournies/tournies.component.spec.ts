import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourniesComponent } from './tournies.component';

describe('TourniesComponent', () => {
  let component: TourniesComponent;
  let fixture: ComponentFixture<TourniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
