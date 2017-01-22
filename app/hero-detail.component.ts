import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Hero }        from './hero';
import { Puck }        from './hero';
import { HeroService } from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: 'hero-detail.component.html',
  styleUrls: [ 'hero-detail.component.css' ]
})

export class HeroDetailComponent implements OnInit {
  hero: Hero;
  puck: Puck;
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  //ngOnInit(): void {
  //  this.route.params
  //    .switchMap((params: Params) => this.heroService.getHero(+params['id']))
  //    .subscribe(hero => this.hero = hero);
  //}

  ngOnInit(): void {
      this.route.params
          // .switchMap((params: Params) => this.heroService.getPuck(+params[String('pid')]))
          /* Check out why this works with id instead of pid */
          .switchMap((params: Params) => this.heroService.getPuck(String(+params['id'])))
          // .subscribe(puck => console.log("init puck", this.puck = puck));
          .subscribe(puck => this.puck = puck[0]);
  }

  save(): void {
    this.heroService.update(this.puck)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
