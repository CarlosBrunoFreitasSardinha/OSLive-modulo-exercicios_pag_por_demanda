import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfortivoComponent } from './infortivo.component';

describe('InfortivoComponent', () => {
  let component: InfortivoComponent;
  let fixture: ComponentFixture<InfortivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfortivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfortivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
