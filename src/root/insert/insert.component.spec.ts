import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertComponent } from './insert.component';

describe('InserComponent', () => {
  let component: InsertComponent;
  let fixture: ComponentFixture<InsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertComponent]
    });
    fixture = TestBed.createComponent(InsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
