import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLimparComponent } from './dialog-limpar.component';

describe('DialogLimparComponent', () => {
  let component: DialogLimparComponent;
  let fixture: ComponentFixture<DialogLimparComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLimparComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogLimparComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
