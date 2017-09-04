import { Subscription } from 'rxjs/Subscription';
import { ValueNamePair, ClassData } from './../shared/models';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Classes, GetSchoolYear } from '../shared/enums';


@Injectable()
export class ClassesService {

  subscriptions: Array<Subscription>;

  constructor(
    private afData: AngularFireDatabase
  ) { }

  getClass( schoolYear: number, classNumber: Classes ) {
    const year = GetSchoolYear( schoolYear );
    const classData = this.afData.list('/classes', { query: { orderByChild: 'class', equalTo: `${year}${classNumber}` } } );
    const newSubscription = classData.subscribe( (snapshot) => {
      return ClassData.fromModel( snapshot[0] );
    } );
    this.subscriptions.push( newSubscription );
  }

}
