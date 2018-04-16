import { Component, Input, OnInit } from '@angular/core';
import { PostDto, ForumDto } from '../api.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input()
  post: PostDto;
  @Input()
  forum: ForumDto;
  @Input()
  postNumber: number;
  constructor() { }

  ngOnInit() {
  }

}
