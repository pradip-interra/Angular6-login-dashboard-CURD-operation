import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDeleteComponent } from './post-delete.component';
import { PostsService } from './../../services/posts.service';
import { IPost } from './../../services/posts.data';

import { Observable, of } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Type } from '@angular/core';
import { Route, ActivatedRouteSnapshot, UrlSegment, Params, Data } from '@angular/router';

export class MockActivatedRoute implements ActivatedRoute {
  snapshot: ActivatedRouteSnapshot;
  url: Observable<UrlSegment[]>;
  params: Observable<Params>;
  queryParams: Observable<Params>;
  fragment: Observable<string>;
  data: Observable<Data>;
  outlet: string;
  component: Type<any> | string;
  routeConfig: Route;
  root: ActivatedRoute;
  parent: ActivatedRoute;
  firstChild: ActivatedRoute;
  children: ActivatedRoute[];
  pathFromRoot: ActivatedRoute[];
  paramMap: Observable<ParamMap>;
  queryParamMap: Observable<ParamMap>;
  toString(): string {
    return "";
  };
}

export class MockParamMap implements ParamMap {
  has(name: string): boolean { return true; }
  get(name: string): string | null { return '' }
  getAll(name: string): string[] { return ['', ''] };
  keys: string[];
}

describe('PostDeleteComponent', () => {
  let component: PostDeleteComponent;
  let fixture: ComponentFixture<PostDeleteComponent>;

  let mockedPostData: IPost = { 'id': 1, 'userId': 1, 'title': 'foo', 'body': 'bar' };

  beforeEach(async(() => {
    const postServiceMock = jasmine.createSpyObj('PostsService', ['getPost', 'delete']);
    
    const activatedRouteMock = new MockActivatedRoute();
    const routerMock = jasmine.createSpyObj('Route', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [PostDeleteComponent],
      providers: [
        { provide: PostsService, useValue: postServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock },
      ]
    })
      .compileComponents();


    postServiceMock.getPost.and.returnValue(of(mockedPostData));
    postServiceMock.delete.and.returnValue(of(mockedPostData));

    activatedRouteMock.paramMap = of(undefined);

    routerMock.navigate.and.returnValue(Promise.resolve(null));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
