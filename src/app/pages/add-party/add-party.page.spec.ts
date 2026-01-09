import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPartyPage } from './add-party.page';

describe('AddPartyPage', () => {
  let component: AddPartyPage;
  let fixture: ComponentFixture<AddPartyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
