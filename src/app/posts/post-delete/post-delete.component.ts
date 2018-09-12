import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { IPost } from '../../services/posts.data';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.scss']
})
export class PostDeleteComponent implements OnInit {

  private deleteErr = '';
  private post: IPost = {
    'body': undefined,
    'id': undefined,
    'title': undefined,
    'userId': undefined,
  };

  constructor(private postService: PostsService, private actRoute: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.actRoute.paramMap.subscribe(
      (paramsMap: ParamMap) => {
        let id = parseInt(paramsMap['params']['id']);
        // get the respective post by calling the service
        this.postService.getPost(id).subscribe(
          (data) => {
            this.post = data;
            console.log(this.post);
          },
          (error) => {
            this.deleteErr = error;
          }
        )
      }
    )
  }

  onSubmit() {
    console.log("OnSubmit of Delete ...");
    this.postService.delete(this.post).subscribe(
      (data) => {
        console.log("Just DELETED.");
        this.route.navigate(['/posts']);
      }
    )
  }

  onCancel() {
    console.log("OnCancel");
    this.route.navigate(['/posts']);
  }

}
