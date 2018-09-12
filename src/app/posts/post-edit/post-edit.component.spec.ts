import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEditComponent } from './post-edit.component';
import { FormsModule } from '@angular/forms';
import { PostsService } from './../../services/posts.service';
import { IPost } from './../../services/posts.data';
import { Observable, of } from 'rxjs';
import { Type } from '@angular/core';
import { Route, ActivatedRouteSnapshot, UrlSegment, Params, Data, Router, ActivatedRoute, ParamMap } from '@angular/router';

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

describe('PostEditComponent', () => {
  let component: PostEditComponent;
  let fixture: ComponentFixture<PostEditComponent>;
  let mockedPostData: IPost = { 'id': 1, 'userId': 1, 'title': 'foo', 'body': 'bar' };

  beforeEach(async(() => {
    const postServiceMock = jasmine.createSpyObj('PostsService', ['edit']);
    const routerMock = jasmine.createSpyObj('Route', ['navigate']);
    const activatedRouteMock = new MockActivatedRoute();

    TestBed.configureTestingModule({
      declarations: [PostEditComponent],
      imports: [FormsModule],
      providers: [
        { provide: PostsService, useValue: postServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ]
    })
      .compileComponents();

    postServiceMock.edit.and.returnValue(of(mockedPostData));
    routerMock.navigate.and.returnValue(Promise.resolve(null));
    activatedRouteMock.paramMap = of(undefined);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
