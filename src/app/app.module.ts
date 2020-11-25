import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Importar Archivo Rutas
import { AppRoutingModule } from './app-routing.module';
//FORMULARIOS REACTIVOS

//import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HeroesComponent } from './pages/heroes/heroes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroeComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
    //ReactiveFormsModule,
    //FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
