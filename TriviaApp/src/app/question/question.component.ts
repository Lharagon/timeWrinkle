import { Component, OnInit } from '@angular/core';
import { TriviaService } from './../trivia.service';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  question: any = { question: '', answer: '', fAnswer1: '', fAnswer2: ''}
  errorMess: string = '';
  constructor(private _triviaService: TriviaService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
  }
  createQuestion(){
    this.errorMess = '';
    console.log(this.question)
    this._triviaService.createQuestion(this.question)
    .then(data => {
      console.log('question was made', data);
      if (data.hasOwnProperty('error')) {
        this.errorMess = data.error;
      } else {
        this._router.navigate(['/']);
      }
    })
    .catch(err => console.log('There was an error creating a question, ', err))


  }

}
