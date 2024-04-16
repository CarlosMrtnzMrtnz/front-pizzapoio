import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PizzaPoioService {
private http = inject(HttpClient)
private urlApi: string  ='http://54.173.19.90:4001/api'

constructor() { }

private myList:any[] = []

private myCart = new BehaviorSubject<any[]>([])
myCarts = this.myCart.asObservable()

addProduct (producto : any) {
    if (this.myList.length == 0) {
        producto.cantidad = 1
        this.myList.push(producto)
        this.myCart.next(this.myList)
    } else {
        const productoModificado = this.myList.find((element)=> {
            return element._id == producto._id
        })
        if (productoModificado) {
            productoModificado.cantidad = productoModificado.cantidad + 1
            this.myCart.next(this.myList)

        } else {
            producto.cantidad = 1
            this.myList.push(producto)
            this.myCart.next(this.myList)
        }
    }
}

deleProducto (id: string) {
    this.myList = this.myList.filter((producto)=>{
        return producto._id != id
    })
    this.myCart.next(this.myList)
}

totalCart() {
    let total = 0;
    if (this.myList.length == 0) {
        sessionStorage.setItem("producto", "")

    }
    for (const producto of this.myList) {
        const cantidad = parseInt(producto.cantidad);
        sessionStorage.setItem("producto", JSON.stringify(this.myList));
        const precio = parseInt(producto.valor);
        if (!isNaN(cantidad) && !isNaN(precio)) {
            total += cantidad * precio;
        }
    }
    return total;
}

estaLogueado(): boolean {
    let estado = sessionStorage.getItem('token') ? true : false;
    return estado;
}

postIngresoUsuario(dataLogin: any) {
    return this.http.post(`${this.urlApi}/ingreso`, dataLogin);
}

postDesencriptarPayload(token: string | null): any {
    if (token != null) {
        const headers = new HttpHeaders().set(
            'Authorization',
            `Beares ${token}`
        );
        return this.http.get(this.urlApi + '/token-info', { headers });
    } else {
        return { msg: 'sin token' };
    }
}
// ------------------------ Services Producto -------------------------------

getProductos() {
    return this.http.get(`${this.urlApi}/consultar-productos`)
}

postProducto(dataProducto: any) {
    return this.http.post(`${this.urlApi}/crear-producto`, dataProducto)
}

putProducto(idProducto: any, dataProducto: any) {
    return this.http.put(`${this.urlApi}/actualizar-producto${idProducto}/producto`, dataProducto)
}

deleteProducto(idProducto: any) {
    return this.http.delete(`${this.urlApi}/eliminar-producto/${idProducto}`)
}

getUnProducto(idProducto: any) {
    return this.http.get(`${this.urlApi}/consultar-producto/${idProducto}`)
}

// -------------------------- Services Usuario --------------------------------

getUsuarios() {
    return this.http.get(`${this.urlApi}/buscar`)
}

postUsuario(dataUsuario: any) {
    return this.http.post(`${this.urlApi}/crear-usuario`, dataUsuario)
}

putUsuario(idUsuario: string, dataUsuario: any) {
    return this.http.put(`${this.urlApi}/modificar/${idUsuario}/perfil`, dataUsuario)
}

deleteUsuario(idUsuario: string) {
    return this.http.delete(`${this.urlApi}/eliminar-usuario/${idUsuario}`)
}

getUnUsuario(idUsuario: string) {
    return this.http.get(`${this.urlApi}/buscar-usuario/${idUsuario}`)
}

// -------------------------- Services Ingredientes ---------------------------

getIngredientes () {
    return this.http.get(`${this.urlApi}/buscar-ingredientes`)
}

postIngrediente (dataIngrediente: any) {
    return this.http.post(`${this.urlApi}/crear-ingrediente`, dataIngrediente)
}

putIngrediente ( ingredienteId : string, dataIngrediente : string) {
    return this.http.put(`${this.urlApi}/actualizar-ingrediente/${ingredienteId}/ingrediente`, dataIngrediente)
}

deleteIngrediente (ingredienteId : string) {
    return this.http.delete(`${this.urlApi}/eliminar-ingrediente/${ingredienteId}`)
}

getUnIngrediente ( ingredienteId : string) {
    return this.http.get(`${this.urlApi}/buscar-ingrediente/${ingredienteId}`)
}

// ----------------------------- Services Pedidos ------------------------------

getPedidos () {
    return this.http.get(`${this.urlApi}/buscar-pedidos`)
}

postPedido (dataPedido : string) {
 return this.http.post(`${this.urlApi}/crear-pedido`, dataPedido)
}

putPedido (pedidoId : string, dataPedido : string) {
    return this.http.put(`${this.urlApi}/actualizar-pedido/${pedidoId}/pedido`, dataPedido)
}

deletePedido (pedidoId : string) {
    return this.http.delete(`${this.urlApi}/eliminar-pedido/${pedidoId}`)
}

getUnPedido (pedidoId : string) {
    return this.http.get(`${this.urlApi}/buscar-pedido/${pedidoId}`)
}

}
