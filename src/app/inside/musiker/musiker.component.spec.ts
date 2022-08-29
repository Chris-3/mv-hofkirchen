import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusikerComponent } from './musiker.component';

describe('MusikerComponent', () => {
  let component: MusikerComponent;
  let fixture: ComponentFixture<MusikerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusikerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusikerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
