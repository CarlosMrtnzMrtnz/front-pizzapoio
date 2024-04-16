import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { Error404Component } from './components/error404/error404.component';
import { autenticacionGuardGuard } from './guards/autenticacion.guard.guard';
import { PedidosComponent } from './components/pedidos/pedidos.component';


export const routes: Routes = [
    { path: '', component:InicioComponent},
    { path: 'admin', canMatch:[autenticacionGuardGuard], component: AdminComponent},
    { path: 'inicio', component: InicioComponent},
    { path: 'registro', component: RegistroComponent},
    { path: 'sigueTuPedido',canMatch:[autenticacionGuardGuard], component: PedidosComponent},
    // { path: 'login', component: LoginComponent},
    { path: '404', component: Error404Component},
    { path: '**', pathMatch: 'full', redirectTo: '404'}


];
