import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Processo } from '../../Classes/Processo';
import { FCFS } from '../../Classes/FCFS';
import { HitoricoBitReferencia } from '../../Classes/HitoricoBitReferencia';
import { SegundaChance } from '../../Classes/SegundaChance';
import { MemoriaFisica } from '../../Classes/MemoriaFisica';
import { Pagina } from '../../Classes/Pagina';

@Component({
  selector: 'app-pagina-vitima',
  templateUrl: './pagina-vitima.component.html',
  styleUrls: ['./pagina-vitima.component.css']
})
export class PaginaVitimaComponent implements OnInit, OnChanges{

  
  @Input() public algoritmoSelecionado: Number = new Number;
  @Input() public listaProcessos: Array<Processo> = [];
  @Input() public gambiarra: Number = new Number;

  public title: string = "Determine a Pagina Vítima";

  
  TAM: number = 8;
  timestamp:number = 100;
  strMemoFisicaCor: string = '#7FB174';
  strMemoVazia: string = '-';
  arrayOrdem:Array<number> = [];

  public memoriaF: Array<MemoriaFisica> = [];
  public filaDePaginas: Array<Pagina> = [];
  corrigir: boolean = false;
  paginavitima: number =0;

  public algoritmoFCFS = new FCFS();
  public algoritmoHistorico = new HitoricoBitReferencia();
  public algoritmoSegundaChance = new SegundaChance();
  
  constructor() { }

  ngOnInit(): void {
    this.preencherMemoriaFisica();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log("OnChanges - Pagina Vitima \n\t "+this.algoritmoSelecionado)
    this.preencherMemoriaFisica();
    
    if(this.algoritmoSelecionado == 0){
      this.arrayOrdem = this.counterComValor(this.algoritmoFCFS.lista.length);
      this.arrayOrdem = this.embaralhamentoFisherYates(this.arrayOrdem)
    }
    else if(this.algoritmoSelecionado == 2){
      this.arrayOrdem = this.counterComValor(this.algoritmoSegundaChance.lista.length);
      this.arrayOrdem = this.embaralhamentoFisherYates(this.arrayOrdem)
    }
    else{
      this.arrayOrdem = this.counterComValor(this.algoritmoHistorico.lista.length);
    }
  }

  
  preencherMemoriaFisica(){
    this.arrayOrdem =[];
    this.memoriaF = [];
    this.algoritmoFCFS =  new FCFS();
    this.algoritmoSegundaChance = new SegundaChance();
    this.algoritmoHistorico = new HitoricoBitReferencia();
    this.corrigir = false;

    for(var i:number =0; i<this.TAM; i++){
      this.memoriaF.push(new MemoriaFisica(i, this.strMemoVazia, this.strMemoFisicaCor,  0));
    }

    for(var i = 0; i<this.listaProcessos.length;i++){
      this.alocaPaginaEmMemoriaFisica(this.listaProcessos[i], 0);
      if(this.listaProcessos[i].pagina.length > 1) this.alocaPaginaEmMemoriaFisica(this.listaProcessos[i], 1);
    }
  }
  
  alocaPaginaEmMemoriaFisica(proc: Processo, num:number):boolean{
    // console.log("|> ALOCA - "+proc.nome+" num="+num);

    if(this.algoritmoSelecionado==0){
      this.algoritmoFCFS.addPaginaEmMemoriaFisica(this.memoriaF, proc, num, this.timestamp);
    }
    else if(this.algoritmoSelecionado==1){
      this.algoritmoHistorico.addPaginaEmMemoriaFisica(this.memoriaF, proc, num, this.timestamp);
    }
    else{
      this.algoritmoSegundaChance.addPaginaEmMemoriaFisica(this.memoriaF, proc, num, this.timestamp);
    }

    
    this.timestamp+=1;
    return true;
  }
  
  desalocaPaginaEmMemoriaFisica(proc: Processo, num:number):boolean{
    var i: number = 0;

    if(this.algoritmoSelecionado==0){
      i = this.algoritmoFCFS.removerProcesso(this.memoriaF, proc, num);
    }
    else if(this.algoritmoSelecionado==1){
      i = this.algoritmoHistorico.removerProcesso(this.memoriaF, proc, num);
    }
    else{
      i = this.algoritmoSegundaChance.removerProcesso(this.memoriaF, proc, num);
    }

    // console.log("|> DESALOCA");
    if(i!=-1)return true;
    return false;
  }

  embaralhamentoFisherYates(array:Array<number>) {
    for (var i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  correcao():void{
    this.corrigir=!this.corrigir;
    if(this.algoritmoSelecionado==0){
      this.paginavitima = 0;
    }
    else if(this.algoritmoSelecionado==1){
      this.paginavitima = this.algoritmoHistorico.verificaBitReferencia();
    }
    else{
      this.paginavitima = this.algoritmoSegundaChance.segundaChance(this.timestamp);
    }
    // console.log("pagina Vitima: "+this.paginavitima)
  }

  counter(i: number) {
    return new Array(i);
  }
  counterComValor(i: number):Array<number>{
    var lista = [];
    for(var x = 0; x<i;x++)lista.push(x)
    return lista;
  }
  statusBitRef(_num: number):void{
    this.algoritmoSegundaChance.historicoBit[_num][0] = this.algoritmoSegundaChance.historicoBit[_num][0] == 0?1:0;
  }

}
