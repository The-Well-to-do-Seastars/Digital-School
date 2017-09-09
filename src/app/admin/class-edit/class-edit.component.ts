import { Router } from '@angular/router';
import { ClassesService } from './../../core/classes.service';
import { ShortUserData } from './../../shared/models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dschool-class-edit',
  templateUrl: './class-edit.component.html',
  styleUrls: ['./class-edit.component.css']
})
export class ClassEditComponent implements OnInit {
  classNames: Array<ShortUserData>;
  selected: string;

  constructor(
    private classesService: ClassesService,
    private router: Router
  ) {
    this.classesService
      .getAllClassNames()
      .then( (classNames) => this.classNames = classNames );
  }

  ngOnInit() {
  }
  onClassChange( course ) {
    this.selected = course;
  }

  onSubmit() {
    this.router.navigate( ['/admin/class/edit/', this.selected ]);
  }
}
