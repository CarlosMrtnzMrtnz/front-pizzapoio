import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ProductosComponent } from '../templates/productos/productos.component';
import { PizzaPoioService } from '../../services/pizza-poio.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    ProductosComponent,
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
    idUsuarioPayload!: string;
    rollPayload!: string

    private ProductosServices = inject(PizzaPoioService)
    productosData = signal<any>([])



    ngOnInit() {
        this.ProductosServices.getProductos().subscribe({
            next: (productos : any) => {
                this.productosData.set(productos)
                for (let i = 0; i < productos.length; i++) {
                    let element = productos[i];
                    let arrayIngredientes = element.ingredientes.split(',')
                    // console.log(arrayIngredientes);
                    element.ingredientes = arrayIngredientes
                    // console.log(element);

                }
                this.productosData.set(productos)
                // this.payloadInfo()
            },
            error(err) {
                console.log(err);
            }
        })
    }


    payloadInfo() {

        let tokenSession = sessionStorage.getItem('token');
        this.ProductosServices
            .postDesencriptarPayload(tokenSession)
            .subscribe((respuestaApi: any) => {
                console.log(respuestaApi);
                this.idUsuarioPayload = respuestaApi.id;
                this.rollPayload = respuestaApi.roll
            });
    }
}
