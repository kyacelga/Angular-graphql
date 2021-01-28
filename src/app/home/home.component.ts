import { R } from '../models/r.book.model';
import { GET_BOOK, ADD_BOOK, DELETE_BOOK } from '../services/book.graphql';
import { BookModel } from '../models/book.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import {map} from 'rxjs/operators'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: Observable<BookModel[]> | undefined;
  form: FormGroup;
  createUser: BookModel;

  constructor(private apollo: Apollo, private fb: FormBuilder) { 
    this.form = this.fb.group({
      name: new FormControl("",Validators.required),
      author: new FormControl("",Validators.required),
      content: new FormControl("",Validators.required),
      
    })
    this.createBook = {};
  }

  ngOnInit() {
    this.synch();
  }

  synch(): void {
    this.book = this.apollo.watchQuery<Response>({
      query: GET_BOOK,
    }).valueChanges.pipe(
      map((result) => result.data.getBook)
    );
  }

  CreateUser():void{
    this.apollo.mutate(
      {
        mutation: ADD_BOOK,
        variables: this.createBook
      }
    ).subscribe(({data})=>
      this.synch(),
    ), () => alert("error")
    
  }
  DeleteUser(idBook: string):void{
    const dataDelete = {id: idBook}
    this.apollo.mutate(
      {
        mutation: DELETE_BOOK,
        variables: dataDelete
      }
    ).subscribe(({data})=>
      this.synch(),
    ), () => alert("error")
    
  }
}
