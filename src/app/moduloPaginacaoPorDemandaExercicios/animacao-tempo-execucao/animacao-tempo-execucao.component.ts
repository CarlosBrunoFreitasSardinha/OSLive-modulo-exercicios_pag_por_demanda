import { Component, Input, OnInit, AfterContentChecked, OnChanges, SimpleChanges } from '@angular/core';
import { FIFO } from '../../Classes/FIFO';
import { MemoriaFisica } from '../../Classes/MemoriaFisica';
import { Pagina } from '../../Classes/Pagina';
import { Processo } from '../../Classes/Processo';

@Component({
  selector: 'app-animacao-tempo-execucao',
  templateUrl: './animacao-tempo-execucao.component.html',
  styleUrls: ['./animacao-tempo-execucao.component.css']
})
export class AnimacaoTempoExecucaoComponent implements OnInit, AfterContentChecked, OnChanges{
  
  @Input() public filaFIFO: FIFO = new FIFO();
  @Input() public listaProcessos: Array<Processo> = [];

  public listaPaginas: Array<Pagina> = [];
  public listaPaginasResposta: Array<Pagina> = [];
  corrigir: boolean = false;
  timeStampAnimacao: number = 100;
  opcaoSelecionada:Array<any> = [];
  opcaoSelecionadaCorrecao:Array<boolean> = [];


  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    for(var i = 0; i<this.filaFIFO.lista.length;i++){
      this.listaPaginasResposta[i] = new Pagina('-');
      this.opcaoSelecionada.push([]);
      this.opcaoSelecionadaCorrecao.push(false);
    }
  }
  ngAfterContentChecked(): void {
    this.listaPaginas = [];
    for(let item of this.listaProcessos){
      for(let op of item.pagina){
        if(true){//op.timeStamp==0 
          this.listaPaginas.push(op);
        }
      }
    }
    
    // console.log('SELECIONADA============')
    // for(var i =0; i< this.opcaoSelecionada.length;i++ ){
    //   console.log(i+'-'+this.opcaoSelecionada[i])
    // }
  }
  correcao():void{
    this.corrigir=!this.corrigir;
  }

  counter(i: number) {
    return new Array(i);
  }
  insereResposta(event: any):void{
    const arr = event.target.value.split(',');
    var i = Number(arr[0]);
    var j = Number(arr[1]);
    
    this.listaPaginasResposta[i] = this.listaPaginas[j];
    this.opcaoSelecionada[i] = [i,j];
    this.opcaoSelecionadaCorrecao[i] = (this.listaPaginasResposta[i] == this.filaFIFO.lista[i]);
  }
  ngOnInit(): void {}

}
