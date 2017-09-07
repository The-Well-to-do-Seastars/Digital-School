import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'dschool-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css'],
})
export class AddNewsComponent implements OnInit {
  public addNewsForm: FormGroup;

  constructor() { }
  add(value) {
    console.log('add');
  }
  
  ngOnInit() {
    const title = new FormControl('');
    const content = new FormControl('');

    this.addNewsForm = new FormGroup({
      title: title,
      content: content
    });
  }

}
