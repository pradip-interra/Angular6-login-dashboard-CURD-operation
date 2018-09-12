import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { PostsComponent } from './posts.component';
import { Component } from '@angular/core';

import { PostsService } from './../services/posts.service';
import { IPost } from './../services/posts.data';

import { of } from 'rxjs';

import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  template: ''
})
export class SidebarComponentMock {
}

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  let mockedPostData: IPost[] = [{ 'id': 1, 'userId': 1, 'title': 'foo', 'body': 'bar' }];

  beforeEach(async(() => {
    const postServiceMock = jasmine.createSpyObj('PostsService', ['getPosts', 'setPostSubject']);
    const routerMock = jasmine.createSpyObj('Route', ['navigate']);

    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [PostsComponent, SidebarComponentMock],
      providers: [
        { provide: PostsService, useValue: postServiceMock },
        { provide: Router, useValue: routerMock },
      ]
    })
      .compileComponents();

    postServiceMock.getPosts.and.returnValue(of(mockedPostData));
    postServiceMock.setPostSubject.and.returnValue(of(undefined));
    routerMock.navigate.and.returnValue(Promise.resolve(null));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
