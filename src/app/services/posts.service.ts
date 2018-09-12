import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { IPost } from './posts.data';
import { Observable, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';  // only for communication across sibling components
import { catchError } from 'rxjs/operators';


@Injectable()
export class PostsService {

  // this is required to provide the pub-sub in Angular. Please see 'setPostSubject' to know details.
  private currentPostBehaviorSubject = new BehaviorSubject('default message');
  private currentPostSubject = this.currentPostBehaviorSubject.asObservable();

  constructor(private http: HttpClient) { }

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>('https://jsonplaceholder.typicode.com/posts')
      .pipe(catchError(error => {
        return throwError(error.message || 'Something uncanny happened!');
      })
      );
  }

  getPost(id: number): Observable<IPost> {
    return this.http.get<IPost>('https://jsonplaceholder.typicode.com/posts/' + id)
      .pipe(catchError(error => {
        return throwError(error.message || 'Something uncanny happened!');
      })
      );
  }

  /*
  * Instead of passing the post-id through parameterized router, we are getting the currently selected post 
  * from the grid. Then we are communicating the post selected from grid to the 'detailsComponent' such that
  * detailsComponent do no need to call the REST service 'getPost'.
  * This is just for practice :)
  */
  setPostSubject(post: IPost) {
    this.currentPostBehaviorSubject.next(JSON.stringify(post));
  }

  getPostSubject(): Observable<string> {
    return this.currentPostSubject;
  }

  create(userId: number, title: string, body: string): Observable<IPost> {
    let postData = {
      'userId': userId,
      'title': title,
      'body': body
    }
    console.log(postData);
    return this.http.post<IPost>('https://jsonplaceholder.typicode.com/posts/', postData)
      .pipe(catchError(error => {
        return throwError(error.message || 'Something uncanny happened!');
      })
      );
  }

  edit(post: IPost): Observable<IPost> {
    console.log("Data as received inside edit:" + post);
    return this.http.patch<IPost>('https://jsonplaceholder.typicode.com/posts/' + post.id, post)
      .pipe(catchError(error => {
        return throwError(error.message || 'Something uncanny happened!');
      })
      );
  }

  delete(post: IPost): Observable<IPost> {
    console.log("Data as received inside edit:" + post);
    return this.http.delete<IPost>('https://jsonplaceholder.typicode.com/posts/' + post.id)
      .pipe(catchError(error => {
        return throwError(error.message || 'Something uncanny happened!');
      })
      );
  }

}
