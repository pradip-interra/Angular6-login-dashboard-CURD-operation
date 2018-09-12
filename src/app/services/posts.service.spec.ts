import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPost } from './../services/posts.data';

import { of } from 'rxjs';

describe('PostsService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  let mockedPostDataArray: IPost[] = [{ 'id': 1, 'userId': 1, 'title': 'foo', 'body': 'bar' }];
  let mockedPostData: IPost = { 'id': 1, 'userId': 1, 'title': 'foo', 'body': 'bar' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostsService],
      imports: [HttpClientTestingModule],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  // make sure that there are no outstanding requests
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([PostsService], (service: PostsService) => {
    expect(service).toBeTruthy();
  }));

  it('test getPosts(Testing GET(collection)', inject([PostsService], (service: PostsService) => {
    service.getPosts().subscribe(posts => {
      expect(posts.length).toBe(1);
      expect(posts).toEqual(mockedPostDataArray);
    });

    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/posts`);
    expect(req.request.method).toBe("GET");
    req.flush(mockedPostDataArray);
  }));

  it('test getPost(Testing GET(single))', inject([PostsService], (service: PostsService) => {
    service.getPost(1).subscribe(post => {
      expect(post).toEqual(mockedPostData);
    });

    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/posts/1`);
    expect(req.request.method).toBe("GET");
    req.flush(mockedPostData);
  }));

  it('test create(Testing POST)', inject([PostsService], (service: PostsService) => {
    service.create(1, 'foo', 'bar').subscribe(post => {
      expect(post).toEqual(mockedPostData);
    });

    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/posts/`);
    expect(req.request.method).toBe("POST");
    req.flush(mockedPostData);
  }));

  it('test edit(Testing PATCH)', inject([PostsService], (service: PostsService) => {
    service.edit(mockedPostData).subscribe(post => {
      expect(post).toEqual(mockedPostData);
    });

    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/posts/1`);
    expect(req.request.method).toBe("PATCH");
    req.flush(mockedPostData);
  }));

  it('test edit(Testing DELETE)', inject([PostsService], (service: PostsService) => {
    service.delete(mockedPostData).subscribe(post => {
      expect(post).toEqual(mockedPostData);
    });

    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/posts/1`);
    expect(req.request.method).toBe("DELETE");
    req.flush(mockedPostData);
  }));
});
