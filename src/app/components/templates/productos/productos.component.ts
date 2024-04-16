import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject, } from '@angular/core';
import { InicioComponent } from '../../inicio/inicio.component';
import { PizzaPoioService } from '../../../services/pizza-poio.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
    private ProductosServices = inject(PizzaPoioService)


    @Input() rutaNombre!: string
    @Input() rutaIngredientes!: string
    @Input() rutaValor!: number
    @Input() rutaImagen!: string
    @Input() rutaId!: string
    @Input() rutaTipo!: string
    @Input() rutaProduct!: string

    addTocart (rutaProduct:any) {
        // console.log(rutaProduct);
        return this.ProductosServices.addProduct(rutaProduct)

    }

}
