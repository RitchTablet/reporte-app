import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputLockComponent } from './input-lock.component';

describe('InputLockComponent', () => {
  let component: InputLockComponent;
  let fixture: ComponentFixture<InputLockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputLockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputLockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
