import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrdouctDetailsComponent } from './prdouct-details.component';

describe('PrdouctDetailsComponent', () => {
  let component: PrdouctDetailsComponent;
  let fixture: ComponentFixture<PrdouctDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrdouctDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrdouctDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
