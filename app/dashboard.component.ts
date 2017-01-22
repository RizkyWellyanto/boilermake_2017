import { Component, OnInit } from '@angular/core';

import { Hero }        from './hero';
import { Puck }        from './hero';
import { HeroService } from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.css' ]
})

export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  pucks: Puck[] = [];
  constructor(private heroService: HeroService) { }
  ngOnInit(): void {
    // this.heroService.getHeroes()
    //   .then(heroes => this.heroes = heroes.slice(1, 5));
      this.heroService.getPucks()
          .then(pucks => this.pucks = pucks);
  }
}
