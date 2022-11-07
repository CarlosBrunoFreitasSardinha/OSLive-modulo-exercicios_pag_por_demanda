
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Pagina } from 'src/app/Classes/Pagina';
import { MemoriaFisica } from '../../../Classes/MemoriaFisica';
import { Processo } from '../../../Classes/Processo';
import { Utils } from 'src/app/Bibliotecas/Utils';
import { FCFS } from 'src/app/Classes/FCFS';
import { TAM, STR_MEMORIA_VAZIA, MEMORIA_FISICA_COR, TIMESTAMP_INICIAL, STR_BIT_ESTADO } from 'src/app/Bibliotecas/Constantes';

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
  @Output() public enviarBack:EventEmitter<any> = new EventEmitter();

  TAM: number = TAM;
  timestamp:number = TIMESTAMP_INICIAL;
  strMemoFisicaCor: string = MEMORIA_FISICA_COR;
  strMemoVazia: string = STR_MEMORIA_VAZIA;
  arrBitEstado: Array<string> = STR_BIT_ESTADO;

  public memoriaF: Array<MemoriaFisica> = [];
  public filaAlgoritmoSelecionado: FCFS = new FCFS();

  public respostaMemoriaFisica: Array<MemoriaFisica> = [];
  public filaDePaginas: Array<Pagina> = [];

  opcaoSelecionada:Array<any> = [];
  opcaoSelecionadaCorrecao:Array<boolean> = [];
  corrigir: boolean = false;
  visualizarResposta:boolean = false;
  back: Number =0;
  nivelAcerto: number =0;

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
    this.visualizarResposta = false;
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
      var quantAlocados = this.filaDePaginas.length;
      if(this.filaDePaginas.length>7)quantAlocados = this.TAM;
      for(var i = 0; i<quantAlocados;i++){
          this.alocaPaginaEmMemoriaFisica(this.filaDePaginas[ordemAleatoriaPaginas[i]]);
        }
        this.enviarDadosMemoria.emit(this.filaAlgoritmoSelecionado);
    }

    this.verificaGabarito(event);
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
    this.verificaGabarito(event);
  }

  correcao():void{
    if(!this.visualizarResposta)this.corrigir=!this.corrigir;
  }
  visualizarRespostaExercicio():void{
    this.visualizarResposta=!this.visualizarResposta;
    this.corrigir=false;
  }
  reiniciar():void{
    this.back = this.back == 1 ? 2 : 1;
    this.enviarBack.emit(this.back);
  }
  counter(i: number) {
    return new Array(i);
  }

  verificaGabarito(event: any):void{
    var acertos = 0;
    var total = Utils.quantPaginas(this.listaProcessos);
    if(this.exercicioSelecionado == 1){
      total *= 2;

      for(var i=0; i<this.respostaMemoriaLogica.length;i++){
        for(var j=0; j<this.respostaMemoriaLogica[i].pagina.length;j++){
          if(this.respostaMemoriaLogica[i].pagina[j].indiceMemoriaFisica == this.listaProcessos[i].pagina[j].indiceMemoriaFisica){
            acertos++;
          }
          if(!(this.respostaMemoriaLogica[i].pagina[j].timeStamp == 0 ||
              !(
                (this.respostaMemoriaLogica[i].pagina[j].timeStamp !=1) == (this.listaProcessos[i].pagina[j].timeStamp !=0)
                )
              )
            ){ acertos++;
          }
        }
      }
      this.nivelAcerto = (acertos/total)*100;
      var y = this.nivelAcerto.toFixed(0);
      this.nivelAcerto = parseFloat(y);
    }
    else{
      total = total>this.TAM ?this.TAM :total;
      for(var i=0; i<this.memoriaF.length;i++){
          if(this.memoriaF[i].nome == this.respostaMemoriaFisica[i].nome
                && this.memoriaF[i].nome!=this.strMemoVazia){
            acertos+=1;
          }
      }
      this.nivelAcerto = (acertos/total)*100;
      var y = this.nivelAcerto.toFixed(0);
      this.nivelAcerto = parseFloat(y);
    }
  }
  constructor() { }
}