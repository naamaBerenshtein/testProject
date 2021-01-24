import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenitorComponent } from './menitor.component';

describe('MenitorComponent', () => {
  let component: MenitorComponent;
  let fixture: ComponentFixture<MenitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
