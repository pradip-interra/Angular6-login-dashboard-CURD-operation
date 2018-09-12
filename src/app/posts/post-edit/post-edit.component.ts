import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { IPost } from '../../services/posts.data';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  private errMsg = '';
  private post: IPost = {
    'body': undefined,
    'id': undefined,
    'title': undefined,
    'userId': undefined,
  };

  submitErrMsg = '';
  isSubmitted = false;

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
            this.errMsg = error;
          }
        )
      }
    )
  }

  onSubmit() {
    console.log("OnSubmit of Edit ...");
    this.isSubmitted = true;
    this.postService.edit(this.post).subscribe(
      (data) => {
        console.log("PATCH return result:" + data.id + ':' + data.userId + ':' + data.title + ':' + data.body);
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
