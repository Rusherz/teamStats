import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverTimeChartComponent } from './over-time-chart.component';

describe('OverTimeChartComponent', () => {
  let component: OverTimeChartComponent;
  let fixture: ComponentFixture<OverTimeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverTimeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverTimeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
