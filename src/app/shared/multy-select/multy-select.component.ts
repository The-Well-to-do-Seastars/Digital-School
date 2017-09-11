import { ShortUserData } from './../models';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'dschool-multy-select',
  templateUrl: './multy-select.component.html',
  styleUrls: ['./multy-select.component.css']
})
export class MultySelectComponent implements OnInit, OnChanges {

  @Input()
  choices: Array<ShortUserData>;
  @Input()
  selection: Array<ShortUserData>;
  @Input()
  title: string;
  @Input()
  sortByName = false;
  selectedChoice: ShortUserData;
  constructor() { }
  ngOnInit(): void {
  }
  ngOnChanges() {
    this.selection.forEach(selected => {
      const index = this.choices.findIndex(el => el.uid === selected.uid);
      if (index !== -1) {
        this.choices.splice(index, 1);
      }
    });
  }

  onSelectChange(value) {
    this.selectedChoice = this.choices[this.choices.findIndex((el) => el.uid === value)];
  }

  addSelection() {
    if (!this.selectedChoice) {
      return;
    }
    this.selection.push(this.selectedChoice);
    if (this.sortByName) {
      this.selection = this.selection.sort((x, y) => x.name > y.name ? 1 : -1);
    } else {
      this.selection = this.selection.sort((x, y) => parseInt(x.uid, 10) - parseInt(y.uid, 10));
    }
    this.choices.splice(this.choices.findIndex((el) => el.uid === this.selectedChoice.uid), 1);
    this.selectedChoice = this.choices[0] || null;
  }

  remove(uid) {
    const removeIndex = this.selection.findIndex(el => el.uid === uid);
    const choice = this.selection[removeIndex];
    this.selection.splice(removeIndex, 1);
    this.choices.push(choice);
    if (this.sortByName) {
      this.choices = this.choices.sort((x, y) => x.name > y.name ? 1 : -1);
    } else {
      this.choices = this.choices.sort((x, y) => parseInt(x.uid, 10) - parseInt(y.uid, 10));
    }
    this.selectedChoice = this.selectedChoice || choice;
  }

}
