import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { GenerationsComponent } from './components/generations/generations.component';

const routes: Routes = [
  { path:'', redirectTo:'home', pathMatch: 'full' },
  { path:'home', component: HomeComponent },
  { path:'pokemon-list', component: PokemonListComponent },
  { path:'generations',component: GenerationsComponent}//añado el routing para generations
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
