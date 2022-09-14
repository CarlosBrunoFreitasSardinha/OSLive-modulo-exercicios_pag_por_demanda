import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimacaoTempoExecucaoComponent } from './animacao-tempo-execucao.component';

describe('AnimacaoTempoExecucaoComponent', () => {
  let component: AnimacaoTempoExecucaoComponent;
  let fixture: ComponentFixture<AnimacaoTempoExecucaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimacaoTempoExecucaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimacaoTempoExecucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
