
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Pagina } from 'src/app/Classes/Pagina';
import { MemoriaFisica } from '../../../Classes/MemoriaFisica';
import { Processo } from '../../../Classes/Processo';
import { Utils } from 'src/app/Bibliotecas/Utils';
import { FCFS } from 'src/app/Classes/FCFS';

@Component({
  selector: 'app-area-exercicio',
  templateUrl: './area-exercicio.component.html',
  styleUrls: ['./area-exercicio.component.css']
})
export class AreaExercicioComponent implements OnInit, OnChanges{
  public title: string = "Exercícios de Paginação por Demanda com Substituição de Páginas";
  
  @Input() public listaProcessos: Array<Processo> = [];
  @Input() public respostaMemoriaLogica: Array<Processo> = [];
  @Input() public exercicioSelecionado:Number = new Number;
  @Input() public gambiarra: Number = new Number;
  
  @Output() public enviarDadosMemoria = new EventEmitter();

  TAM: number = 8;
  timestamp:number = 100;
  strMemoFisicaCor: string = '#7FB174';
  strMemoVazia: string = '-';

  public memoriaF: Array<MemoriaFisica> = [];
  public filaAlgoritmoSelecionado: FCFS = new FCFS();

  public respostaMemoriaFisica: Array<MemoriaFisica> = [];
  public filaDePaginas: Array<Pagina> = [];

  opcaoSelecionada:Array<any> = [];
  opcaoSelecionadaCorrecao:Array<boolean> = [];
  corrigir: boolean = false;

  ngOnInit(): void {
    this.preencherMemoriaFisica();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.preencherMemoriaFisica();
  }

  preencherMemoriaFisica(){
    this.memoriaF = [];
    this.respostaMemoriaFisica = [];

    this.filaAlgoritmoSelecionado = new FCFS();

    this.opcaoSelecionada = [];
    this.opcaoSelecionadaCorrecao = [];
    this.corrigir = false;
    this.filaDePaginas = [];

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
      this.respostaMemoriaFisica.push(new MemoriaFisica(i, this.strMemoVazia, this.strMemoFisicaCor,  0));
    }
    // embaralha a ordem das Paginas
    if(this.filaDePaginas.length>0){
      var ordemAleatoriaPaginas: Array<number> = Utils.embaralhamentoFisherYates(Utils.listaNum(this.filaDePaginas.length));
    
      for(var i = 0; i<this.TAM;i++){
          this.alocaPaginaEmMemoriaFisica(this.filaDePaginas[ordemAleatoriaPaginas[i]]);
        }
        this.enviarDadosMemoria.emit(this.filaAlgoritmoSelecionado);
    }
  }

  alocaPaginaEmMemoriaFisica(pagX: Pagina):boolean{
    this.filaAlgoritmoSelecionado.addPaginaEmMemoriaFisica(this.memoriaF, pagX, this.timestamp);
    
    this.timestamp+=1;
    this.enviarDadosMemoria.emit(this.filaAlgoritmoSelecionado);
    return true;
  }

  desalocaPaginaEmMemoriaFisica(pagX: Pagina):boolean{
    var i = this.filaAlgoritmoSelecionado.removerProcesso(this.memoriaF, pagX);

    this.enviarDadosMemoria.emit(this.filaAlgoritmoSelecionado);

    if(i!=-1)return true;
    return false;
  }

  insereResposta(event: any):void{
    // console.log("\n\t InsereResposta")
    const arr = event.target.value.split(',');
    var i = Number(arr[0]);
    var j = Number(arr[1]);
    
    this.respostaMemoriaFisica[i].nome = this.strMemoVazia;
    this.respostaMemoriaFisica[i].cor = this.strMemoFisicaCor;

    if(j!=-1){
      this.respostaMemoriaFisica[i].nome = this.filaDePaginas[j].toString();
      this.respostaMemoriaFisica[i].cor = this.filaDePaginas[j].cor;
    }
    this.opcaoSelecionada[i] = [i,j];
    this.opcaoSelecionadaCorrecao[i] = (this.respostaMemoriaFisica[i].nome == this.memoriaF[i].nome);
  }

  correcao():void{
    this.corrigir=!this.corrigir;
  }
  counter(i: number) {
    return new Array(i);
  }
  constructor() { }
}