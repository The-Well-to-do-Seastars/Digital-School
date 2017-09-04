import { ShortUserData } from './../../shared/models/user';
import { StudentsService } from './../../core/students.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dschool-generate-class',
  templateUrl: './generate-class.component.html',
  styleUrls: ['./generate-class.component.css']
})
export class GenerateClassComponent implements OnInit {

  students: Array<ShortUserData>;

  constructor(
    private studentService: StudentsService
  ) { }

  ngOnInit() {
    this.students = this.studentService.getStudentsFromClass( 2, 0 );
  }

  test() {
    console.log( this.students );
  }

}
