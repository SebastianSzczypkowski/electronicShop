import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrdouctListComponent } from './prdouct-list.component';

describe('PrdouctListComponent', () => {
  let component: PrdouctListComponent;
  let fixture: ComponentFixture<PrdouctListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrdouctListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrdouctListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
