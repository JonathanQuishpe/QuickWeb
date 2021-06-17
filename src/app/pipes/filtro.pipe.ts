import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any, texto: string, columna: string): any[] {
    if (texto === '' || texto === '0' || columna === '') {
      return arreglo;
    }

    texto.toLowerCase();
    var filtrado = arreglo.filter(item => {
      return item[columna].toLowerCase()
        .includes(texto);
    });
    return filtrado;

  }
}
