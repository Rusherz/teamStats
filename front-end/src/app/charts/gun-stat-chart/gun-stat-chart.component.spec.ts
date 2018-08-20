import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GunStatChartComponent } from './gun-stat-chart.component';

describe('GunStatChartComponent', () => {
  let component: GunStatChartComponent;
  let fixture: ComponentFixture<GunStatChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GunStatChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GunStatChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
