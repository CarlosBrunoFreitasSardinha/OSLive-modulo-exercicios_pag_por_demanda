import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Processo } from '../../Classes/Processo';
import { FCFS } from '../../Classes/FCFS';
import { HitoricoBitReferencia } from '../../Classes/HitoricoBitReferencia';
import { SegundaChance } from '../../Classes/SegundaChance';
import { MemoriaFisica } from '../../Classes/MemoriaFisica';
import { Pagina } from '../../Classes/Pagina';
import { Utils } from 'src/app/Bibliotecas/Utils';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-pagina-vitima',
  templateUrl: './pagina-vitima.component.html',
  styleUrls: ['./pagina-vitima.component.css']
})
export class PaginaVitimaComponent implements OnInit, OnChanges{

  @Input() public algoritmoSelecionado: Number = new Number;
  @Input() public listaProcessos: Array<Processo> = [];
  @Input() public gambiarra: Number = new Number;

  public title: string = "Determine a Página Vítima";
  public algoritmoEscalonamento: Array<string> =[
    "Exercício com FCFS (first-come-first-served)",
    "Exercício com Histórico de bits de referência",
    "Exercício com Segunda Chance",
    ];

  TAM: number = 8;
  timestamp:number = 100;
  strMemoFisicaCor: string = '#7FB174';
  strMemoVazia: string = '-';
  arrayOrdem:Array<number> = [];

  public memoriaF: Array<MemoriaFisica> = [];
  public filaDePaginas: Array<Pagina> = [];
  corrigir: boolean = false;
  paginavitima: number = 0;
  secureNumberAlgo: number = 0;
  segundaChance = true;
  public resposta: number = 0;

  public algoritmoFCFS = new FCFS();
  public algoritmoHistorico = new HitoricoBitReferencia();
  public algoritmoSegundaChance = new SegundaChance();
  public algoritmoSegundaChanceOrdenado = new SegundaChance();
  
  constructor() { }

  ngOnInit(): void {
    this.preencherMemoriaFisica();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( this.algoritmoSelecionado == 0 || this.algoritmoSelecionado == 1 || this.algoritmoSelecionado == 2){
      this.secureNumberAlgo = this.algoritmoSelecionado.valueOf();
    }
    this.preencherMemoriaFisica();
    
    if(this.algoritmoSelecionado == 0){
      this.arrayOrdem = Utils.embaralhamentoFisherYates(Utils.listaNum(this.algoritmoFCFS.lista.length));
      this.paginavitima = 0;
    }
    else if(this.algoritmoSelecionado == 2){
      this.arrayOrdem = Utils.embaralhamentoFisherYates(Utils.listaNum(this.algoritmoSegundaChance.lista.length));
      
      var temp = this.algoritmoSegundaChance.segundaChance(this.timestamp);

      for(var i=0; i<this.algoritmoSegundaChanceOrdenado.lista.length;i++){
        if(this.algoritmoSegundaChance.lista[temp].toString().localeCompare( this.algoritmoSegundaChanceOrdenado.lista[i].toString())==0)
        this.paginavitima = i;
      }
    }
    else{
      this.arrayOrdem = Utils.listaNum(this.algoritmoHistorico.lista.length);
      this.paginavitima = this.algoritmoHistorico.verificaBitReferencia();
    }
  }

  preencherMemoriaFisica(){
    this.arrayOrdem =[];
    this.memoriaF = [];
    this.algoritmoFCFS =  new FCFS();
    this.algoritmoSegundaChance = new SegundaChance();
    this.corrigir = false;
    this.filaDePaginas = [];
    this.segundaChance = true;
    
    // cria Lista de Paginas
    for(let item of this.listaProcessos){
      for(let i of item.pagina){
        i.indiceMemoriaFisica = -1;
        i.timeStamp=0;
        this.filaDePaginas.push(i);
      }
    }

    // cria os espaços na memória Fisica
    for(var i:number =0; i<this.TAM; i++){
      this.memoriaF.push(new MemoriaFisica(i, this.strMemoVazia, this.strMemoFisicaCor,  0));
    }

    if(this.filaDePaginas.length>this.TAM){
        var ordemAleatoriaPaginas: Array<number> = Utils.embaralhamentoFisherYates(Utils.listaNum(this.filaDePaginas.length));
        for(var i = 0; i<this.TAM;i++){
            this.alocaPaginaEmMemoriaFisica(this.filaDePaginas[ordemAleatoriaPaginas[i]]);
          }
    }

    if(this.algoritmoSelecionado==2){

      this.algoritmoSegundaChanceOrdenado = new SegundaChance();
      this.algoritmoHistorico = new HitoricoBitReferencia();

      for(var x =0; x< this.algoritmoSegundaChance.lista.length;x++){
        this.algoritmoSegundaChanceOrdenado.lista.push(this.algoritmoSegundaChance.lista[x]);
        this.algoritmoSegundaChanceOrdenado.historicoBit.push(this.algoritmoSegundaChance.historicoBit[x]);
      }
    }
  }
  
  alocaPaginaEmMemoriaFisica(pagX: Pagina):boolean{

    if(this.algoritmoSelecionado==0){
      this.algoritmoFCFS.addPaginaEmMemoriaFisica(this.memoriaF, pagX, this.timestamp);
    }
    else if(this.algoritmoSelecionado==1){
      this.algoritmoHistorico.addPaginaEmMemoriaFisica(this.memoriaF, pagX, this.timestamp);
    }
    else{
      this.algoritmoSegundaChance.addPaginaEmMemoriaFisica(this.memoriaF, pagX,  this.timestamp);
    }

    this.timestamp+=1;
    return true;
  }
  
  desalocaPaginaEmMemoriaFisica(proc: Pagina):boolean{
      var i: number = 0;

      if(this.algoritmoSelecionado==0){
        i = this.algoritmoFCFS.removerProcesso(this.memoriaF, proc);
      }
      else if(this.algoritmoSelecionado==1){
        i = this.algoritmoHistorico.removerProcesso(this.memoriaF, proc);
      }
      else{
        i = this.algoritmoSegundaChance.removerProcesso(this.memoriaF, proc);
      }

      if(i!=-1)return true;
      return false;
    }

  correcao():void{

      if(this.resposta != this.paginavitima && this.segundaChance) {
        this.segundaChance = false;
      }
      else{
        this.corrigir=!this.corrigir;
        this.segundaChance = true;
      }
  }

  counter(i: number) {
    return new Array(i);
  }

  statusBitRef(_num: number):void{
    this.corrigir=false;
    this.algoritmoSegundaChance.historicoBit[_num][0] = this.algoritmoSegundaChance.historicoBit[_num][0] == 0 ? 1 : 0;
  }
}
