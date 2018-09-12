import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreateComponent } from './post-create.component';
import { FormsModule } from '@angular/forms';
import { PostsService } from './../../services/posts.service';
import { IPost } from './../../services/posts.data';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('PostCreateComponent', () => {
  let component: PostCreateComponent;
  let fixture: ComponentFixture<PostCreateComponent>;
  let mockedPostData: IPost = { 'id': 1, 'userId': 1, 'title': 'foo', 'body': 'bar' };

  beforeEach(async(() => {
    const postServiceMock = jasmine.createSpyObj('PostsService', ['create']);
    const routerMock = jasmine.createSpyObj('Route', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [PostCreateComponent],
      imports: [FormsModule],
      providers: [
        { provide: PostsService, useValue: postServiceMock },
        { provide: Router, useValue: routerMock },
      ]
    })
      .compileComponents();
    postServiceMock.create.and.returnValue(of(mockedPostData));
    routerMock.navigate.and.returnValue(Promise.resolve(null));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
