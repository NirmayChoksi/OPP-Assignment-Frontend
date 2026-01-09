import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberLoginPage } from './number-login.page';

describe('NumberLoginPage', () => {
  let component: NumberLoginPage;
  let fixture: ComponentFixture<NumberLoginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
