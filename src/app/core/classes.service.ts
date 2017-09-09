import { Subscription } from 'rxjs/Subscription';
import { ValueNamePair, ClassData } from './../shared/models';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Classes, GetSchoolYear } from '../shared/enums';
import * as firebase from 'firebase/app';

@Injectable()
export class ClassesService {

  subscriptions: Array<Subscription>;

  constructor(
    private afData: AngularFireDatabase
  ) { }

  getClass( schoolYear: number, classNumber: Classes ) {
    const year = GetSchoolYear( schoolYear );
    const classData = this.afData.list('classes/', { query: { orderByChild: 'class', equalTo: `${year}${classNumber}` } } );
    const newSubscription = classData.subscribe( (snapshot) => {
      return ClassData.fromModel( snapshot[0] );
    } );
    this.subscriptions.push( newSubscription );
  }

  createClass(model) {
    return this.afData.list( 'classes/' ).push( model );
  }

  update(model) {
    return this.afData.list('/classes').update(model.uid, model);
  }
  getByName( name ): firebase.Promise<any> {
    const classData = ClassData.fromClassName(name);
    console.log(classData);
    const query = firebase.database().ref('classes')
      .orderByChild('schoolYear').equalTo( classData.schoolYear.toString() );
    return query.once('value')
      .then( (snapshot) => {
        let dbClass = null;
        snapshot.forEach( child => {
          const childData = child.val();
          if ( childData.class_name === classData.class_name.toString() ) {
            dbClass = child.val();
            dbClass.uid = child.key;
          }
        });
        return Promise.resolve( dbClass );
      } );
  }

}
