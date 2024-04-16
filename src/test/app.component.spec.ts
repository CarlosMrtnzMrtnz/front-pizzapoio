import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../app/components/navbar/navbar.component';
import { AppComponent } from '../app/app.component';
import { LoginComponent } from '../app/components/login/login.component';
import { InicioComponent } from '../app/components/inicio/inicio.component';
import { FooterComponent } from '../app/components/footer/footer.component';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterOutlet,
        NavbarComponent,
        LoginComponent,
        InicioComponent,
        FooterComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'pizza-poio'`, () => {
    expect(component.title).toEqual('pizza-poio');
  });
});
