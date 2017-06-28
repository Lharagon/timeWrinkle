import { Component, OnInit } from '@angular/core';
import { TriviaService } from './../trivia.service';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  allQuestions: any = [];
  currentUser: any = {};
  errorMess: string = '';
  constructor(private _triviaService: TriviaService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getAllQuestions();
  }
  getCurrentUser() {
    this._triviaService.getCurrent()
    .then( data => {
      this.currentUser = data;
    })
    .catch( err => console.log('problem getting all questions ', err))
  }

  getAllQuestions() {
    this._triviaService.getAllQuestions()
    .then( data => {
      {this.allQuestions = data; console.log(this.allQuestions)};
    })
    .catch(err => console.log('error while getting all questions ', err))
    }
    onSubmit (formData) {
      var answersAndQuestions = { answers: formData.value, questions: this.allQuestions }
      this._triviaService.checkAnswers(answersAndQuestions)
      .then(data => {
        console.log('attempt was made', data);
        if (data.hasOwnProperty('error')) {
          this.errorMess = data.error;
        } else {
          this._router.navigate(['/']);
        }
      })
      .catch(err => console.log('There was an error creating a question, ', err))
    }
  }
