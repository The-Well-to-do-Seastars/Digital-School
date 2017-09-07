import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'dschool-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css'],
})
export class AddNewsComponent implements OnInit {
  public addNewsForm: FormGroup;

  constructor() { }
  onSubmit(value) {
    console.log(this.addNewsForm);
  }

  showValidationMessades() {
    console.log('Here')
    for (var key in this.addNewsForm.controls) {
      this.addNewsForm.controls[key].markAsTouched();
    }
  }
  
  ngOnInit() {
    const title = new FormControl(null, Validators.required);
    const content = new FormControl(null, Validators.required);

    this.addNewsForm = new FormGroup({
      title: title,
      content: content
    });
  }

}
