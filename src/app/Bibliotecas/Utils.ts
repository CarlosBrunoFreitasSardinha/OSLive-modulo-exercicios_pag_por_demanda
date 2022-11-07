import { Processo } from "../Classes/Processo";

export namespace Utils{
      export function embaralhamentoFisherYates(array:Array<number>):Array<number> {
            for (var i = array.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
          }

      export function gera_cor(coresJaUtilizadas:Array<Processo> = []): string{
                  var coresDisponiveis:Array<string> = [
                        "#F8D7D0",//ROSA PASTEL
                        "#FDF3B8",//AMARELO PASTEL
                        "#89D3B1",//VERDE ESCURO PASTEL
                        "#A4DFFF",//AZUL CLARO PASTEL
                        "#C6ACC7",//ANIL PASTEL
                        "#F0C4A5",//LARANJA PASTEL
                        "#C9D2A0",//VERDE CLARO PASTEL
                        "#FF9B94",//VERMELHO PASTEL
                        "#F1E6E4",//CINZA PASTEL
                  ]//https://blog.dezaina.com.br/cores-pasteis-tudo-o-que-voce-precisa-saber/
                  for (var i = 0; i < coresJaUtilizadas.length; i++ ) {
                        var pos = coresDisponiveis.indexOf(coresJaUtilizadas[i].cor);
                        if(pos!=-1)coresDisponiveis.splice(pos, 1);
                  }
            return coresDisponiveis[Math.floor(Math.random() * coresDisponiveis.length)];
      }

      export function listaNum(num:number):Array<number>{
            var listNum:Array<number> = [];
            for(var i=0; i<num;i++)listNum.push(i);
            return listNum;
      }
      
      export function quantPaginas(listProc:Array<Processo>):number{
            var listNum = 0;
            for(let i of listProc)listNum+=i.pagina.length;
            return listNum;
      }

}
