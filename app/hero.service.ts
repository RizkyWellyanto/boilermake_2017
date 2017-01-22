import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
import { Puck } from './hero';

@Injectable()
export class HeroService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private pucksUrl = 'api/puck';  // URL to web api

  /*This would not work if the in memory api is not enabled */
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    console.log("this.heroesUrl", this.heroesUrl);
    return this.http.get(this.heroesUrl)
               .toPromise()
               // .then(response => console.log(response.json().data))
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);
  }

  getPucks(): Promise<Puck[]> {
      console.log("this.pucksUrl", this.pucksUrl);
      return this.http.get(this.pucksUrl)
                 .toPromise()
                 .then(response => response.json().data as Puck[])
                 .catch(this.handleError);
  }

  getPuck(pid: string): Promise<Puck> {
      console.log("pid getPuck: ", pid);
      const url = `${this.pucksUrl}/${pid}`;
      return this.http.get(url)
                 .toPromise()
                 .then(response => response.json().data as Puck)
                 // .then(response => console.log(response.json().data))
                 .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // update(hero: Hero): Promise<Hero> {
  //   const url = `${this.heroesUrl}/${hero.id}`;
  //   return this.http
  //     .put(url, JSON.stringify(hero), {headers: this.headers})
  //     .toPromise()
  //     .then(() => hero)
  //     .catch(this.handleError);
  // }

  update(puck: Puck): Promise<Puck> {
    /* Create new headers and encode them */
    // let headers = new headers;
    // headers.append('Content-Type', 'application/json');
    let bodyString    = JSON.stringify({"label": puck.label});
    let updateHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options       = new RequestOptions({headers: updateHeaders});

    const url = `${this.pucksUrl}/${puck.pid}`;
    console.log("puck.label in update", puck.label);
    console.log("puck url", url);

    return this.http
      .put(url, bodyString, options)
      .toPromise()
      .then(() => console.log("returned puck", puck))
      // .then(() => this.puck = puck)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
