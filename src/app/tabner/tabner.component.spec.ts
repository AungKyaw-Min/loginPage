import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabnerComponent } from './tabner.component';

describe('TabnerComponent', () => {
  let component: TabnerComponent;
  let fixture: ComponentFixture<TabnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
