import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';
import { QuestionComponent } from './question/question.component';



const routes: Routes = [
  {path: 'lets_play', pathMatch: 'full', component: PlayComponent},
  {path: 'new_question', pathMatch: 'full', component: QuestionComponent},
  {path: '', pathMatch: 'full', component: HomeComponent},
  // {path: '/:message', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
