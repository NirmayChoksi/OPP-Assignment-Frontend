import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillDetailsPage } from './bill-details.page';

describe('BillDetailsPage', () => {
  let component: BillDetailsPage;
  let fixture: ComponentFixture<BillDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BillDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
