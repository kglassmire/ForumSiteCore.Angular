import { Component, Input } from '@angular/core';
import { PostDto } from '../api.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {

  private _posts: PostDto[];

  @Input()
  set posts(posts: PostDto[]) {
    this._posts = posts;
  }

  get posts(): PostDto[] { return this._posts; }

  constructor()  {}

}
