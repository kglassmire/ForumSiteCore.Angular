import { Component, Input, OnInit } from '@angular/core';
import { PostDto, ForumDto, VotedType, PostService } from '../api.service';

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

  get totalScoreTitle() {
    return `${this.post.upvotes - this.post.downvotes} (${this.post.upvotes}|${this.post.downvotes})`;
  }
  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  upvote(myEvent) {
    let hasDownvote = false;
    if (this.post.userVote === VotedType.Up) {
      console.log(`${myEvent}: upvoted post, but post ${this.post.id} is already upvoted`);
      return;
    }
    if (this.post.userVote === VotedType.Down) {
      hasDownvote = true;
    }
    console.log(`${myEvent}: upvoted post ${this.post.id}`);
    this.postService.vote(this.post.id, true)
      .subscribe(success => console.log(success), error => console.log(error));

    if (hasDownvote) {
      this.post.downvotes--;
    }
    this.post.upvotes++;
    this.post.userVote = VotedType.Up;
  }

  downvote(myEvent) {
    let hasUpvote = false;
    if (this.post.userVote === VotedType.Down) {
      console.log(`${myEvent}: downvoted post, but post ${this.post.id} is already downvoted`);
      return;
    }
    if (this.post.userVote === VotedType.Up) {
      console.log(`post ${this.post.id} had an upvote previously.`);
      hasUpvote = true;
    }
    console.log(`${myEvent}: downvoted post ${this.post.id}`);
    this.postService.vote(this.post.id, false)
      .subscribe(success => console.log(success), error => console.log(error));
    if (hasUpvote) {
      this.post.upvotes--;
    }
    this.post.downvotes++;
    this.post.userVote = VotedType.Down;
  }
}
