import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ClipComponent } from './clip/clip.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ClipService } from './services/clip.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'clip/:id',
    component: ClipComponent,
    // Search for a function called 'resolve' in ClipService
    // and call it whenever a user visits the route (if available).
    // It will run even before ngOnInit.
    resolve: {
      clip: ClipService,
    },
  },
  // Lazyload (only load them when the user visits them) video modules from this point
  {
    path: '',
    loadChildren: async () =>
      (await import('./video/video.module')).VideoModule,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
