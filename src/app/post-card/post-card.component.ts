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

  upvote() {
    this.vote(VotedType.Up);
  }

  downvote() {
    this.vote(VotedType.Down);
  }

  save() {
    if (this.post.userSaved === true) {
      console.log(`user unsaved post ${this.post.id}`);
      this.post.userSaved = false;
    } else {
      console.log(`user saved post ${this.post.id}`);
      this.post.userSaved = true;
    }
  }

  ngOnInit() {
  }

  private vote(voteType: VotedType) {
    if (this.post.userVote === voteType) {
      console.log(`user performed ${VotedType[voteType]}, but post ${this.post.id} already had vote type`);
      return;
    }
    let hasDownvote = false;
    let hasUpvote = false;

    if (this.post.userVote === VotedType.Down) {
      hasDownvote = true;
    }
    if (this.post.userVote === VotedType.Up) {
      console.log(`post ${this.post.id} had an upvote previously.`);
      hasUpvote = true;
    }

    console.log(`user upvoted post ${this.post.id}`);
    this.postService.vote(this.post.id, true)
      .subscribe(success => console.log(success), error => console.log(error));

    if (voteType = VotedType.Up) {
      if (hasDownvote) {
        this.post.downvotes--;
      }
      this.post.upvotes++;
      this.post.userVote = VotedType.Up;
    }

    if (voteType = VotedType.Down) {
      if (hasUpvote) {
        this.post.upvotes--;
      }
      this.post.downvotes++;
      this.post.userVote = VotedType.Down;
    }
  }
}
