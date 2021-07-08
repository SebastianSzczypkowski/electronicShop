import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrdouctCategoryMenuComponent } from './prdouct-category-menu.component';

describe('PrdouctCategoryMenuComponent', () => {
  let component: PrdouctCategoryMenuComponent;
  let fixture: ComponentFixture<PrdouctCategoryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrdouctCategoryMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrdouctCategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
