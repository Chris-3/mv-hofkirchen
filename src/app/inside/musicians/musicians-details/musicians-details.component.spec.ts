import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusiciansDetailsComponent } from './musicians-details.component';

describe('MusiciansDetailsComponent', () => {
  let component: MusiciansDetailsComponent;
  let fixture: ComponentFixture<MusiciansDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusiciansDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusiciansDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
