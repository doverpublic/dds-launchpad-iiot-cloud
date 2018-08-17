import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerInfoComponent } from './trailer-info.component';

describe('TrailerInfoComponent', () => {
  let component: TrailerInfoComponent;
  let fixture: ComponentFixture<TrailerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
