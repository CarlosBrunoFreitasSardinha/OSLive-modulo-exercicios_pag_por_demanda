import { Component } from '@angular/core';
import { Processo } from './Classes/Processo';
import { FIFO } from './Classes/FIFO';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-root',
  template: `
            <app-menu-lateral
                    (enviarDados)="setDadosProcesso($event)"
                    (enviarTipoExercicio)="setTipoExercicio($event)"></app-menu-lateral>

            <app-area-exercicio 
                    [listaProcessos]="getDadosProcesso" 
                    [exercicioSelecionado]="getTipoExercicio" 
                    (enviarDadosMemoria)="setDadosMemoriaFisica($event)"></app-area-exercicio>
            
            <app-animacao-tempo-execucao *ngIf="getTipoExercicio==0"
                    [listaProcessos]="getDadosProcesso"
                    [filaFIFO]="getDadosPaginas"></app-animacao-tempo-execucao>

            `
          ,
})
export class AppComponent {
  public getDadosProcesso: Array<Processo> = [];
  public getDadosPaginas: FIFO = new FIFO();
  public getTipoExercicio: Number = new Number;

  title = 'OSlive-Ex-paginacao-por-demanda';

  public setTipoExercicio(event:number){
        this.getTipoExercicio = event;
        } 
  public setDadosProcesso(event:Array<Processo>){
        this.getDadosProcesso = event;
        } 
  public setDadosMemoriaFisica(event:FIFO){
        this.getDadosPaginas = event;
        } 
}
