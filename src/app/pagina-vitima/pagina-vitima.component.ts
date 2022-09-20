import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Processo } from '../Classes/Processo';
import { FCFS } from '../Classes/FCFS';
import { HitoricoBitReferencia } from '../Classes/HitoricoBitReferencia';
import { SegundaChance } from '../Classes/SegundaChance';
import { MemoriaFisica } from '../Classes/MemoriaFisica';
import { FIFO } from '../Classes/FIFO';
import { Pagina } from '../Classes/Pagina';

@Component({
  selector: 'app-pagina-vitima',
  templateUrl: './pagina-vitima.component.html',
  styleUrls: ['./pagina-vitima.component.css']
})
export class PaginaVitimaComponent implements OnInit, OnChanges{

  
  @Input() public listaProcessos: Array<Processo> = [];
  @Input() public algoritmoSelecionado: Number = new Number;

  public title: string = "Determine a Pagina Vítima";

  
  TAM: number = 8;
  timestamp:number = 100;
  strMemoFisicaCor: string = '#7FB174';
  strMemoVazia: string = '-';

  public memoriaF: Array<MemoriaFisica> = [];
  public filaDePaginas: Array<Pagina> = [];
  corrigir: boolean = false;
  paginavitima: number =0;

  public filaAlgoritmoSelecionado: FIFO = new FIFO();
  public algoritmoFCFS = new FCFS();
  public algoritmoHistorico = new HitoricoBitReferencia();
  public algoritmoSegundaChance = new SegundaChance();
  
  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit")
    for(var i:number =0; i<this.TAM; i++){
      this.memoriaF.push(new MemoriaFisica(i, this.strMemoVazia, this.strMemoFisicaCor,  0));
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.algoritmoSelecionado==0){
      
    }
    else if(this.algoritmoSelecionado==1){
      
    }
    else{
      
    }
    
    this.preencherMemoriaFisica();
  }

  
  preencherMemoriaFisica(){
     
    for(var i = 0; i<this.listaProcessos.length;i++){
      if(!this.listaProcessos[i].bit){
        this.alocaPaginaEmMemoriaFisica(this.listaProcessos[i], 0);

        if(this.listaProcessos[i].pagina.length > 1) {
          this.alocaPaginaEmMemoriaFisica(this.listaProcessos[i], 1);
        }

        this.listaProcessos[i].bit = !this.listaProcessos[i].bit;
      }
    }
    console.log('memoria fisica')
    console.log(this.memoriaF)
    console.log('Processo')
    console.log(this.listaProcessos)
  }

  correcao():void{
    this.corrigir=!this.corrigir;
    this.paginavitima = this.algoritmoHistorico.verificaBitReferencia();
    console.log("pagina Vitima: "+this.paginavitima)
  }

  counter(i: number) {
    return new Array(i);
  }
  
  alocaPaginaEmMemoriaFisica(proc: Processo, num:number):boolean{
    console.log("|> ALOCA - "+proc.nome+" num="+num);
    this.algoritmoHistorico.addPaginaEmMemoriaFisica(this.memoriaF, proc, num, this.timestamp);
    
    this.timestamp+=1;
    // this.enviarDadosMemoria.emit(this.algoritmoHistorico);
    return true;
  }
  
  desalocaPaginaEmMemoriaFisica(proc: Processo, num:number):boolean{
    var i = this.algoritmoHistorico.removerProcesso(this.memoriaF, proc, num);
    // this.enviarDadosMemoria.emit(this.algoritmoHistorico);
    console.log("|> DESALOCA");
    if(i!=-1)return true;
    return false;
  }

}
