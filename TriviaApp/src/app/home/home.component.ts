import { Component, OnInit } from '@angular/core';
import { TriviaService } from './../trivia.service';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: any = {};
  allAttemps: any[] = [];
  constructor(private _triviaService: TriviaService, private _route: ActivatedRoute, private _router: Router) {

  }

  ngOnInit() {
    this._triviaService.checkCurrent()
    .then((data) => {
      console.log(data)
      if (!data.answer) {
        var UserName = prompt("Name please :]?");
        if(!UserName) {
          location.reload();
        }
        console.log(UserName)
        this.login({name: UserName})
      } else {
        this.getAttempts();
      }
    })
  }

  login(thisUser) {
    console.log('came into login function')
    this._triviaService.login(thisUser)
    .then((data) => {this.currentUser = data; console.log(data); this.getAttempts();})
    .catch((err) => console.log(err))
  }
  getAttempts () {
    this._triviaService.getAttempts()
    .then((data) => {this.allAttemps = data; console.log(data)})
    .catch((err) => console.log('error while getting all attemps ',err))
  }
  logOut(){
    console.log("Leaving...")
    this._triviaService.LogOut()
    .then( (data) => {console.log('coming into the then');this._router.navigate(['/']); location.reload();})
    .catch((err) => console.log('did not log out successfully'))
  }
}
