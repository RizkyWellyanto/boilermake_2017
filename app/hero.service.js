"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var HeroService = (function () {
    function HeroService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.pucksUrl = 'api/puck'; // URL to web api
        /*This would not work if the in memory api is not enabled */
        this.heroesUrl = 'api/heroes'; // URL to web api
    }
    HeroService.prototype.getHeroes = function () {
        console.log("this.heroesUrl", this.heroesUrl);
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    HeroService.prototype.getPucks = function () {
        console.log("this.pucksUrl", this.pucksUrl);
        return this.http.get(this.pucksUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    HeroService.prototype.getPuck = function (pid) {
        console.log("pid getPuck: ", pid);
        var url = this.pucksUrl + "/" + pid;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    HeroService.prototype.getHero = function (id) {
        var url = this.heroesUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    HeroService.prototype.delete = function (id) {
        var url = this.heroesUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    HeroService.prototype.create = function (name) {
        return this.http
            .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    // update(hero: Hero): Promise<Hero> {
    //   const url = `${this.heroesUrl}/${hero.id}`;
    //   return this.http
    //     .put(url, JSON.stringify(hero), {headers: this.headers})
    //     .toPromise()
    //     .then(() => hero)
    //     .catch(this.handleError);
    // }
    HeroService.prototype.update = function (puck) {
        /* Create new headers and encode them */
        // let headers = new headers;
        // headers.append('Content-Type', 'application/json');
        var bodyString = JSON.stringify({ "label": puck.label });
        var updateHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: updateHeaders });
        var url = this.pucksUrl + "/" + puck.pid;
        console.log("puck.label in update", puck.label);
        console.log("puck url", url);
        return this.http
            .put(url, bodyString, options)
            .toPromise()
            .then(function () { return console.log("returned puck", puck); })
            .catch(this.handleError);
    };
    HeroService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    HeroService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HeroService);
    return HeroService;
}());
exports.HeroService = HeroService;
//# sourceMappingURL=hero.service.js.map