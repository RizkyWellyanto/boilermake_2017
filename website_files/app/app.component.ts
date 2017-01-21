import { Component }          from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active">Pucks</a>
      <a routerLink="/heroes" routerLinkActive="active">Alexa</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app.component.css']
})
export class AppComponent {
  // title = 'Tour of Heroes';
  title = 'Virtual Alfred';
}
