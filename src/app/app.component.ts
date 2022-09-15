import { Component } from '@angular/core';
import { Processo } from './Classes/Processo';
import { FIFO } from './Classes/FIFO';

@Component({
  selector: 'app-root',
  template: `
            <app-menu-lateral
                    (enviarDados)="setDadosProcesso($event)"></app-menu-lateral>

            <app-area-exercicio 
                    [listaProcessos]="getDadosProcesso" 
                    (enviarDadosMemoria)="setDadosMemoriaFisica($event)"></app-area-exercicio>
            
            <app-animacao-tempo-execucao
                    [listaProcessos]="getDadosProcesso"
                    [filaFIFO]="getDadosPaginas"></app-animacao-tempo-execucao>

            `
          ,
})
export class AppComponent {
  public getDadosProcesso: Array<Processo> = [];
  public getDadosPaginas: FIFO = new FIFO();

  title = 'OSlive-Ex-paginacao-por-demanda';

  public setDadosProcesso(event:Array<Processo>){
    this.getDadosProcesso = event;
 } 
 public setDadosMemoriaFisica(event:FIFO){
    this.getDadosPaginas = event;
 } 
}
