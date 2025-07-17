import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTablePageComponent } from './simple-table-page.component';

describe('SimpleTablePageComponent', () => {
  let component: SimpleTablePageComponent;
  let fixture: ComponentFixture<SimpleTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleTablePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
