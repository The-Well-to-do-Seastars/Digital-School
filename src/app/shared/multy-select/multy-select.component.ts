import { ShortUserData } from './../models';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dschool-multy-select',
  templateUrl: './multy-select.component.html',
  styleUrls: ['./multy-select.component.css']
})
export class MultySelectComponent implements OnInit {

  @Input()
  choices: Array<ShortUserData>;
  @Input()
  selection: Array<ShortUserData>;
  selectedChoice: ShortUserData;
  constructor() { }

  ngOnInit() {
  }

  onSelectChange(value) {
    this.selectedChoice = this.choices[ this.choices.findIndex( (el) => el.uid === value ) ];
  }

  addSelection() {
    if (!this.selectedChoice) {
      return;
    }
    this.selection.push( this.selectedChoice );
    this.selection = this.selection.sort( (x, y) => parseInt( x.uid, 10 ) - parseInt( y.uid, 10 ) );
    this.choices.splice( this.choices.findIndex( (el) => el.uid === this.selectedChoice.uid ), 1 );
    this.selectedChoice = this.choices[ 0 ] || null;
  }

  remove( uid ) {
    const removeIndex = this.selection.findIndex( el => el.uid === uid );
    const choice = this.selection[ removeIndex ];
    this.selection.splice( removeIndex, 1 );
    this.choices.push( choice );
    this.choices = this.choices.sort( ( x, y ) => parseInt( x.uid, 10 ) - parseInt( y.uid, 10 ) );
  }

}
