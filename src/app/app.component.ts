import { Component } from '@angular/core';
import { Processo } from './Classes/Processo';
import { FIFO } from './Classes/FIFO';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-root',
  template: `
            <app-menu-lateral
                    (enviarDados)="setDadosProcesso($event)"
                    (enviarTipoExercicio)="setTipoExercicio($event)"
                    (enviarTipoAlgoritmo)="setTipoAlgoritmo($event)"
                    (enviarRespostaMemoriaLogica)="setRespostaMemoriaLogica($event)"></app-menu-lateral>

            <app-area-exercicio  *ngIf="getTipoExercicio!=3"
                    [listaProcessos]="getDadosProcesso" 
                    [exercicioSelecionado]="getTipoExercicio" 
                    [respostaMemoriaLogica]="getRespostaMemoriaLogica" 
                    (enviarDadosMemoria)="setDadosMemoriaFisica($event)"></app-area-exercicio>

            <app-pagina-vitima *ngIf="getTipoExercicio==3"
                    [listaProcessos]="getDadosProcesso" 
                    [algoritmoSelecionado]="getTipoAlgoritmo" ></app-pagina-vitima>
            
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
        public getTipoAlgoritmo: Number = new Number;
        public getRespostaMemoriaLogica: Array<Processo> = [];
      
        title = 'OSlive-Ex-paginacao-por-demanda';
      
        public setTipoAlgoritmo(event:number){
                this.getTipoAlgoritmo = event;
              } 
      
        public setTipoExercicio(event:number){
                this.getTipoExercicio = event;
                } 
        public setDadosProcesso(event:Array<Processo>){
              this.getDadosProcesso = event;
              } 
        public setDadosMemoriaFisica(event:FIFO){
              this.getDadosPaginas = event;
              } 
      public setRespostaMemoriaLogica(event:Array<Processo>){
                this.getRespostaMemoriaLogica = [];
                this.getRespostaMemoriaLogica = event;
              console.log("HOME-Component - Fui ativado ")
              } 
}
