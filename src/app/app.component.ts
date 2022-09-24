import { Component } from '@angular/core';
import { Processo } from './Classes/Processo';
import { FIFO } from './Classes/FIFO';

@Component({
  selector: 'app-root',
  template: `
        <div class="container-fluid">
                <div class="row">
                        <div class="col-3">
                                <app-menu-lateral
                                        (enviarDados)="setDadosProcesso($event)"
                                        (enviarTipoAlgoritmo)="setTipoAlgoritmo($event)"
                                        (enviarTipoExercicio)="setTipoExercicio($event)"
                                        (enviarRespostaMemoriaLogica)="setRespostaMemoriaLogica($event)"
                                        (enviarGambiarra)="setGambiarra($event)"></app-menu-lateral>
                        </div>
                        
                        <div class="col-9">
                                <app-area-exercicio  *ngIf="getTipoExercicio!=3"
                                        [listaProcessos]="getDadosProcesso" 
                                        [exercicioSelecionado]="getTipoExercicio" 
                                        [respostaMemoriaLogica]="getRespostaMemoriaLogica" 
                                        (enviarDadosMemoria)="setDadosMemoriaFisica($event)"></app-area-exercicio>

                                <app-pagina-vitima *ngIf="getTipoExercicio==3"

                                        [algoritmoSelecionado]="getTipoAlgoritmo" 
                                        [listaProcessos]="getDadosProcesso" 
                                        [gambiarra]="getGambiarra"
                                        ></app-pagina-vitima>
                                
                                <app-animacao-tempo-execucao *ngIf="getTipoExercicio==0"
                                        [listaProcessos]="getDadosProcesso"
                                        [filaFIFO]="getDadosPaginas"></app-animacao-tempo-execucao>
                        </div>
                </div>
        </div>
            `
          ,
})
export class AppComponent {
        public getDadosProcesso: Array<Processo> = [];
        public getDadosPaginas: FIFO = new FIFO();
        public getTipoExercicio: Number = new Number;
        public getTipoAlgoritmo: Number = new Number;
        public getGambiarra: Number = new Number;
        public getRespostaMemoriaLogica: Array<Processo> = [];
      
        title = 'OSlive-Ex-paginacao-por-demanda';
      
        public setTipoAlgoritmo(event:number){
                this.getTipoAlgoritmo = event;
              } 
        public setGambiarra(event:number){
                this.getGambiarra = event;
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
              } 

}
