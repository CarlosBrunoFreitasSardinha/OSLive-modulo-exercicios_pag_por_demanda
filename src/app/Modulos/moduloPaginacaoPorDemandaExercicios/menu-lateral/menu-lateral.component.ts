import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Utils } from 'src/app/Bibliotecas/Utils';
import { Processo } from '../../../Classes/Processo';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})

export class MenuLateralComponent implements OnInit {

  @Output() public enviarRespostaMemoriaLogica:EventEmitter<any> = new EventEmitter();
  @Output() public enviarDados:EventEmitter<any> = new EventEmitter();
  
  @Output() public enviarTipoExercicio:EventEmitter<any> = new EventEmitter();
  @Output() public enviarTipoAlgoritmo:EventEmitter<any> = new EventEmitter();

  @Output() public enviarGambiarra:EventEmitter<any> = new EventEmitter();

  public aleatorio: boolean = true;
  public geraAleatorio: boolean = true;
  public nProcessos: number = 4;
  public eGambiarra: number = 1;
  
  public selectedProcesso = new Processo('', 0, '#000', false);

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

  public exercicioSelecionado:{tipo:string, exec: Number} = {tipo:"", exec: -1};
  public escalonador: {tipo:string, exec: Number} = {tipo:"", exec: 0};

  
  
  ngOnInit(): void {
    this.enviarTipoExercicio.emit(this.exercicioSelecionado.exec);
    this.enviarTipoAlgoritmo.emit(0);
    this.enviarGambiarra.emit(0);
  }

  escolheExercicio(event:any){
    const arr = event.target.value.split(',');    
    this.exercicioSelecionado={tipo:arr[0], exec: Number(arr[1])};
    // console.log("num Exec Emitido: "+Number(arr[1]))
    
    this.enviarTipoExercicio.emit(Number(arr[1]));
    this.eGambiarra = this.eGambiarra ==1? 0 : 1;
    this.enviarGambiarra.emit(this.eGambiarra);

  }

  escolheEscalonador(event:any){
    const arr = event.target.value.split(',');    
    this.escalonador={tipo:arr[0], exec: Number(arr[1])};
    // console.log("num Escalonador Emitido: "+Number(arr[1]))
    this.enviarTipoAlgoritmo.emit(Number(arr[1]));
    
    this.eGambiarra = this.eGambiarra ==1? 0 : 1;
    this.enviarGambiarra.emit(this.eGambiarra);
  }
  
  geradorAleatorio():void{
    var isPaginaVitimaInCondicion = this.exercicioSelecionado.exec == 3 && Utils.quantPaginas(this.listaProcessos) < 8;
    
    if(isPaginaVitimaInCondicion){
      for(let i of this.listaNomes){
        i.exec=1;
      }
      this.nProcessos = 4;
      this.listaProcessos = [];
    }
      if(this.aleatorio || isPaginaVitimaInCondicion){
        var sequencia:Array<number> = Utils.embaralhamentoFisherYates(Utils.listaNum(this.nProcessos));
        
        for (var i = 0; i < this.nProcessos; i++) {
          var x = 0;
          if(this.listaNomes[sequencia[i]].exec==1){
                if(this.exercicioSelecionado.exec == 3){

                  if(this.listaProcessos.length>=2){
                        if(this.listaProcessos.length==2 && Utils.quantPaginas(this.listaProcessos) < 3){ 
                            x = (Number)(Math.round(Math.random() * 2) + 2);}

                        else if(this.listaProcessos.length==3 && Utils.quantPaginas(this.listaProcessos) < 8){ x = 4; }

                    } else x = (Number)(Math.round(Math.random() * 3) + 1);
                } else x = (Number)(Math.round(Math.random() * 3) + 1);

                this.cadastrar(new Processo(this.listaNomes[sequencia[i]].nome, x, Utils.gera_cor()));
                this.listaNomes[i].exec = 0;
          }
          else{
                var x = (Number)(Math.round(Math.random() * 3) + 1);
                this.cadastrar(new Processo(this.listaNomes[sequencia[i]].nome, x, Utils.gera_cor()));
                this.listaNomes[i].exec = 0;
              }
        }
        
        this.eGambiarra = this.eGambiarra ==1? 2 : 1;
        this.enviarGambiarra.emit(this.eGambiarra);
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
      
      this.eGambiarra = this.eGambiarra ==1? 2 : 1;
      this.enviarGambiarra.emit(this.eGambiarra);
    }
  }

  cadastrar(proc: Processo):void{ 
    // console.log('CADASTRAR --> ' + proc.toString());
    if(this.validaP(proc) && this.elementoExiste(proc.nome)==-1){

        if(proc.pagina.length!=0){
          this.listaProcessos.push(new Processo(proc.nome, proc.pagina.length, Utils.gera_cor(), proc.bit));
          this.respostaMemoriaLogica.push(new Processo(proc.nome, proc.pagina.length, Utils.gera_cor(), proc.bit));
        }
        else{
          this.listaProcessos.push(new Processo(proc.nome, this.nProcessos, Utils.gera_cor(), proc.bit));
          this.respostaMemoriaLogica.push(new Processo(proc.nome, this.nProcessos, Utils.gera_cor(), proc.bit));
        } 

      if(!this.aleatorio){
        // var i = this.listaNomesTec.indexOf(proc.nome);
        // this.listaNomes[i].exec = 0;
        // this.listaNomesTec.splice(i, 1);
      }

        this.enviarDados.emit(this.listaProcessos);
        this.enviarRespostaMemoriaLogica.emit(this.respostaMemoriaLogica);
        // this.enviarRespostaMemoriaLogica = new EventEmitter();

        this.eGambiarra = this.eGambiarra ==1? 2 : 1;
        this.enviarGambiarra.emit(this.eGambiarra);
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
