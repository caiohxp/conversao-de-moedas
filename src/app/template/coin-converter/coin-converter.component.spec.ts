import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinConverterComponent } from './coin-converter.component';

describe('CoinConverterComponent', () => {
  let component: CoinConverterComponent;
  let fixture: ComponentFixture<CoinConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinConverterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
