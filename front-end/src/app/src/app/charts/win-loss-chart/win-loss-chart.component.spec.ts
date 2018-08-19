import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinLossChartComponent } from './win-loss-chart.component';

describe('WinLossChartComponent', () => {
  let component: WinLossChartComponent;
  let fixture: ComponentFixture<WinLossChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinLossChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinLossChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
