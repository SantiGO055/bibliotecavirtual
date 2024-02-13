import { Component, Input } from '@angular/core';
import { Libro } from 'src/app/model/libro';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-detalle-libro',
  templateUrl: './detalle-libro.component.html',
  styleUrls: ['./detalle-libro.component.scss']
})
export class DetalleLibroComponent {

  detalleLibro!: Libro;
  @Input() libro!: Libro;
  
  constructor(private dataService: DataService) {
    
  
  }

  ngOnInit() {
    this.detalleLibro = this.dataService.libro;
    
    console.log(this.detalleLibro)
    
  }

}
