import { Component, OnInit } from '@angular/core';
import { Processo } from '../../Classes/Processo';
import { FIFO } from '../../Classes/FIFO';

@Component({
  selector: 'app-home-paginacao-por-demanda-exercicios',
  templateUrl: './home-paginacao-por-demanda-exercicios.component.html',
  styleUrls: ['./home-paginacao-por-demanda-exercicios.component.css']
})
export class HomePaginacaoPorDemandaExerciciosComponent implements OnInit {
  public getDadosProcesso: Array<Processo> = [];
  public getDadosPaginas: FIFO = new FIFO();
  public getTipoExercicio: Number = new Number;
  public getTipoAlgoritmo: Number = new Number;
  public getGambiarra: Number = new Number;
  public getRespostaMemoriaLogica: Array<Processo> = [];

  title = 'OSlive-Ex-paginacao-por-demanda';

  ngOnInit(): void {
  }
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
