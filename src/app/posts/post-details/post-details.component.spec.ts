import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailsComponent } from './post-details.component';

import { PostsService } from './../../services/posts.service';
import { IPost } from './../../services/posts.data';

import { of } from 'rxjs';
import { Router } from '@angular/router';


describe('PostDetailsComponent', () => {
  let component: PostDetailsComponent;
  let fixture: ComponentFixture<PostDetailsComponent>;

  let mockedPostData: IPost = { 'id': 1, 'userId': 1, 'title': 'foo', 'body': 'bar' };

  beforeEach(async(() => {
    const postServiceMock = jasmine.createSpyObj('PostsService', ['getPostSubject']);
    const routerMock = jasmine.createSpyObj('Route', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [PostDetailsComponent],
      providers: [
        { provide: PostsService, useValue: postServiceMock },
        { provide: Router, useValue: routerMock },
      ]
    })
      .compileComponents();

    postServiceMock.getPostSubject.and.returnValue(of(mockedPostData));
    routerMock.navigate.and.returnValue(Promise.resolve(null));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
