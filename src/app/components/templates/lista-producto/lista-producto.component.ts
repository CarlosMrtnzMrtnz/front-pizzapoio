import { Component, Input, inject } from '@angular/core';
import { PizzaPoioService } from '../../../services/pizza-poio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-producto',
  standalone: true,
  imports: [],
  templateUrl: './lista-producto.component.html',
  styleUrl: './lista-producto.component.css'
})
export class ListaProductoComponent {
    private ProductosServices = inject(PizzaPoioService)

    @Input() rutaNombre!: string
    @Input() rutaIngredientes!: string
    @Input() rutaValor!: number
    @Input() rutaImagen!: string
    @Input() rutaId!: string
    @Input() rutaTipo!: string
    @Input() rutaCantidad!: string
    @Input() rutaProduct!: string

    eliminarProducto(idProducto: string) {
        try {
            console.log(idProducto);
            this.ProductosServices.deleteProducto(idProducto).subscribe({
            })
            Swal.fire({
                title: "Producto Eliminado correctamente!",
                icon: "success"
            })
 } catch (error) {
    Swal.fire({
        title: "No se pudo Eliminar el Producto!",
        icon: "error"
    })
        }
    }

}
