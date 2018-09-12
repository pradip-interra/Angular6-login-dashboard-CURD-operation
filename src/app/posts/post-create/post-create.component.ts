import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { IPost } from '../../services/posts.data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  post: IPost = {
    'body': undefined,
    'id': undefined,
    'title': undefined,
    'userId': undefined,
  };
  isSubmitted = false;
  submitErrMsg = "";

  constructor(private postService: PostsService, private route: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log("OnSubmit");
    this.isSubmitted = true;
    this.postService.create(this.post.userId, this.post.title, this.post.body).subscribe(
      (data) => {
        console.log("POST return result:" + data.id + ':' + data.userId + ':' + data.title + ':' + data.body);
        this.route.navigate(['/posts']);
      },
      (error) => {
        this.submitErrMsg = error;
      }
    )
  }

  
  onCancel() {
    console.log("OnCancel");
    this.route.navigate(['/posts']);
  }

}
