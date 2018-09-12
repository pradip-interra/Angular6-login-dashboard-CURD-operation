import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { IPost } from '../../services/posts.data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  private detailsErr = '';
  public post: IPost = {
    'body': undefined,
    'id': undefined,
    'title': undefined,
    'userId': undefined,
  };

  constructor(private postService: PostsService, private route: Router) { }

  ngOnInit() {
    // here we are subscribing to the Post as set by the 'getCurrentPost()' method in the PostComponent. 
    // So here PostComponent is the publisher and PostDetails is the subscriber. 
    // The data is communicated through the rxjs behaviour subject used in shared service PostService.
    this.postService.getPostSubject().subscribe(
      (publishedPost) => {
        this.post = JSON.parse(publishedPost);
        console.log(this.post);
      },
      (error) => {
        this.detailsErr = error;
      }
    )
  }

  onBack() {
    this.route.navigate(['/posts']);
  }

}
