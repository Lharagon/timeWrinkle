import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';

@Injectable()
export class TriviaService {

  constructor(private _http: Http) { }
  login(User) {
    return this._http.post('/api/login', User).map(data=>data.json()).toPromise();
  }
  getAttempts() {
    return this._http.get('/api/getAttempts').map(data=>data.json()).toPromise();
  }
  createQuestion(quest) {
    return this._http.post('/api/createQuestion', quest).map(data=>data.json()).toPromise();
  }
  getCurrent() {
    return this._http.get('/api/getCurrent').map(data=>data.json()).toPromise();
  }
  getAllQuestions() {

    return this._http.get('/api/getAllQuestions').map(data=>data.json()).toPromise();
  }
  checkAnswers(info) {
    return this._http.post('/api/checkAnswers', info).map(data=>data.json()).toPromise();
  }
  checkCurrent() {

    return this._http.get('/api/checkCurrent').map(data=>data.json()).toPromise();
  }
  LogOut() {
    console.log('coming into service logout')
    return this._http.get('/api/getOut').map(data=>data.json()).toPromise();
  }
}
