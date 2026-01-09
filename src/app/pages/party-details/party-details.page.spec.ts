import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartyDetailsPage } from './party-details.page';

describe('PartyDetailsPage', () => {
  let component: PartyDetailsPage;
  let fixture: ComponentFixture<PartyDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
