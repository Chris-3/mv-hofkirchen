import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusiciansListComponent } from './musicians-list.component';

describe('MusiciansListComponent', () => {
  let component: MusiciansListComponent;
  let fixture: ComponentFixture<MusiciansListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusiciansListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusiciansListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
