import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Utils } from 'src/app/Bibliotecas/Utils';
import { Processo } from '../../../Classes/Processo';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})

export class MenuLateralComponent implements OnInit, OnChanges {

  @Input() public back: Number = new Number;

  @Output() public enviarRespostaMemoriaLogica:EventEmitter<any> = new EventEmitter();
  @Output() public enviarDados:EventEmitter<any> = new EventEmitter();
  
  @Output() public enviarTipoExercicio:EventEmitter<any> = new EventEmitter();
  @Output() public enviarTipoAlgoritmo:EventEmitter<any> = new EventEmitter();

  @Output() public enviarRecursoTecnico:EventEmitter<any> = new EventEmitter();

  public aleatorio: boolean = true;
  public geraAleatorio: boolean = true;
  public nProcessos: number = 4;
  public eRecursoTecnico: number = 1;
  public eBack:Number=0;
  public PaginaVitimaCondicaoMinima = false;
  

  public listaProcessos: Array<Processo> = [];
  public respostaMemoriaLogica: Array<Processo> = [];
  public listaNomes: Array<{nome:string, exec: number}> = [
                                                            {nome:"A", exec: 1},
                                                            {nome:"B", exec: 1},
                                                            {nome:"C", exec: 1},
                                                            {nome:"D", exec: 1},
                                                          ];
  public listaDeExercicios: Array<{tipo:string, exec: Number}> =[
                            {tipo:"Preencher Memória Lógica", exec: 1},
                            {tipo:"Preencher Memória Fisica", exec: 2},
                            {tipo:"Determinar Página Vítima", exec: 3},
                          ];//{tipo:"Sequência de Alocação da Memória Física", exec: 0},
  public algoritmoEscalonamento: Array<{tipo:string, exec: Number}> =[
                            {tipo:"FCFS (first-come-first-served)", exec: 0},
                            {tipo:"Histórico de bits de referência", exec: 1},
                            {tipo:"Segunda Chance", exec: 2},
                          ];

  public exercicioSelecionado:{tipo:string, exec: Number} = {tipo:"", exec: 1};
  public escalonador: {tipo:string, exec: Number} = {tipo:"", exec: 0};

  
  
  ngOnInit(): void {
    this.enviarTipoExercicio.emit(this.exercicioSelecionado.exec);
    this.enviarTipoAlgoritmo.emit(0);
    this.enviarRecursoTecnico.emit(0);
  }

  ngOnChanges(): void {
    if(this.eBack != this.back.valueOf()){
      this.eBack = this.back.valueOf();
      this.listaProcessos = [];
      this.respostaMemoriaLogica = [];
      this.exercicioSelecionado = {tipo:"Preencher Memória Lógica", exec: 1};
      this.enviarTipoExercicio.emit(1);
      this.enviarRespostaMemoriaLogica.emit(this.respostaMemoriaLogica);
      this.enviarDados.emit(this.listaProcessos);
      this.aleatorio = true;
    }
  }

  escolheExercicio(event:any){
    this.exercicioSelecionado.tipo = this.listaDeExercicios[this.exercicioSelecionado.exec.valueOf()-1].tipo;
    this.exercicioSelecionado.exec = this.listaDeExercicios[this.exercicioSelecionado.exec.valueOf()-1].exec;
        
    this.enviarTipoExercicio.emit(this.exercicioSelecionado.exec);
    this.eRecursoTecnico = this.eRecursoTecnico ==1? 0 : 1;
    this.enviarRecursoTecnico.emit(this.eRecursoTecnico);

    this.PaginaVitimaCondicaoMinima = this.exercicioSelecionado.exec == 3 && Utils.quantPaginas(this.listaProcessos) < 8;
  }

  escolheEscalonador(event:any){
    this.escalonador.tipo = this.algoritmoEscalonamento[this.escalonador.exec.valueOf()].tipo;
    this.escalonador.exec = this.algoritmoEscalonamento[this.escalonador.exec.valueOf()].exec;
    this.enviarTipoAlgoritmo.emit(this.escalonador.exec);
    
    this.eRecursoTecnico = this.eRecursoTecnico ==1? 0 : 1;
    this.enviarRecursoTecnico.emit(this.eRecursoTecnico);
  }
  
  geradorAleatorio():void{
    
      this.PaginaVitimaCondicaoMinima = this.exercicioSelecionado.exec == 3 && Utils.quantPaginas(this.listaProcessos) < 8;
      if(this.PaginaVitimaCondicaoMinima){
        for(let i of this.listaNomes){
          i.exec=1;
        }
        this.nProcessos = 4;
        this.limparLista(this.listaProcessos);
        this.limparLista(this.respostaMemoriaLogica);
      }
        if(this.aleatorio || this.PaginaVitimaCondicaoMinima){
          var sequencia:Array<number> = Utils.embaralhamentoFisherYates(Utils.listaNum(this.nProcessos));
          
          for (var i = 0; i < this.nProcessos; i++) {
            var x = 0;
            if(this.listaNomes[sequencia[i]].exec==1){
                  if(this.exercicioSelecionado.exec == 3){

                    if(this.listaProcessos.length>=2){
                          if(this.listaProcessos.length==2 && Utils.quantPaginas(this.listaProcessos) < 3){ 
                              x = (Number)(Math.round(Math.random() * 2) + 2);
                            }

                          else if(this.listaProcessos.length==3 && Utils.quantPaginas(this.listaProcessos) < 8){ 
                            x = 4; 
                          }
                          else x = (Number)(Math.round(Math.random() * 3) + 1);
                      } else x = (Number)(Math.round(Math.random() * 3) + 1);
                  } else x = (Number)(Math.round(Math.random() * 3) + 1);

                  this.cadastrar(new Processo(this.listaNomes[sequencia[i]].nome, x, Utils.gera_cor(this.listaProcessos)));
                  this.listaNomes[i].exec = 0;
            }
            else{
                  var x = (Number)(Math.round(Math.random() * 3) + 1);
                  this.cadastrar(new Processo(this.listaNomes[sequencia[i]].nome, x, Utils.gera_cor(this.listaProcessos)));
                  this.listaNomes[i].exec = 0;
                }
          }
          this.PaginaVitimaCondicaoMinima = this.exercicioSelecionado.exec == 3 && Utils.quantPaginas(this.listaProcessos) < 8;
          
          this.eRecursoTecnico = this.eRecursoTecnico ==1? 2 : 1;
          this.enviarRecursoTecnico.emit(this.eRecursoTecnico);
          this.enviarDados.emit(this.listaProcessos);
        }
      this.aleatorio = false;
  }

  elementoExiste(str:string):number{
    for(var i=0; i<this.listaProcessos.length;i++){
      if(this.listaProcessos[i].nome == str){
        return i;
      }
    }
    return -1;
  }

  limparLista(listaMemoLogica: Array<Processo>):void{
    for (let i of listaMemoLogica){
      this.excluir(i);
    }
  }

  processosOrdenados(listaDeProcessos: Array<Processo>):Array<Processo>{
    var temp: Array<Processo> = [];

    for (let i of listaDeProcessos){
      if(i.nome == "A")temp[0] = i;
      else if(i.nome == "B")temp[1] = i;
      else if(i.nome == "C")temp[2] = i;
      else if(i.nome == "D")temp[3] = i;
    }
    return temp;
  }

  excluir(proc: Processo):void{// console.log('REMOVER ----------------> ' + proc.toString());
    var v:number = this.elementoExiste(proc.nome);
    if(v!=-1){
      for(var i =0; i<this.listaNomes.length;i++){
        if(this.listaNomes[i].nome==proc.nome)this.listaNomes[i].exec = 1;
      }

      // this.listaNomesTec.push(proc.nome);

      this.listaProcessos.splice(v,1);
      this.respostaMemoriaLogica.splice(v,1);
      
      this.enviarDados.emit(this.listaProcessos);
      this.enviarRespostaMemoriaLogica.emit(this.respostaMemoriaLogica);
      
      this.eRecursoTecnico = this.eRecursoTecnico ==1? 2 : 1;
      this.enviarRecursoTecnico.emit(this.eRecursoTecnico);
    }
  }

  cadastrar(proc: Processo):void{ 
    if(this.validaP(proc) && this.elementoExiste(proc.nome)==-1){

        this.listaProcessos.push(new Processo(proc.nome, proc.pagina.length, proc.cor, proc.bit));
        this.respostaMemoriaLogica.push(new Processo(proc.nome, proc.pagina.length, proc.cor, proc.bit));

        this.enviarDados.emit(this.listaProcessos);
        this.enviarRespostaMemoriaLogica.emit(this.respostaMemoriaLogica);

        this.eRecursoTecnico = this.eRecursoTecnico ==1? 2 : 1;
        this.enviarRecursoTecnico.emit(this.eRecursoTecnico);
      }
    else this.cancelar();
    
  }

  validaP(proc: Processo):boolean{
    if (this.nProcessos < 1 || this.nProcessos > 4) return false;
    return true;
  }

  cancelar():void{
    this.nProcessos = 4;
  }

  constructor(){}
}
