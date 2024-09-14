import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../../public/assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit {
  title:string = ''
  result:string = ''
  questions: any = ''
  questionSelected:any = ''

  questionIndex:number = 0

  finished:boolean = false

  answers:string[] = []

  ngOnInit():void {
    if (quizz_questions) {
      this.title = quizz_questions.title
      this.questions = quizz_questions.questions
      this.changeQuestion()
    }
  }

  changeQuestion():void {
    this.questionSelected = this.questions[this.questionIndex]
    this.questionIndex++
  }

  playerChoose(value:string):void{
    this.answers.push(value)
    this.changeQuestion()
    this.isEndGame()
  }

  isEndGame():void {
    if (this.questionIndex === this.questions.length){
      this.finished = true
      let cont = 0
      for(let ans of this.answers){
        cont = ans == 'A' ? ++cont:--cont
      }
      this.result = cont > 0 ? quizz_questions.results.A: quizz_questions.results.B
    }
  }
}
