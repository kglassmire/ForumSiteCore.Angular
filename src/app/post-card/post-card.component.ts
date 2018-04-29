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

  constructor(private postService: PostService) { }

  get totalScoreTitle() {
    return `${this.post.upvotes - this.post.downvotes} (${this.post.upvotes}|${this.post.downvotes})`;
  }

  upvote() {
    this.vote(VotedType.Up);
  }

  downvote() {
    this.vote(VotedType.Down);
  }

  save() {
    if (this.post.userSaved === true) {
      console.log(`user unsaved post ${this.post.id}`);
      this.postService.save(this.post.id, false).subscribe(success => console.log(success), error => console.log(error));
      this.post.userSaved = false;
    } else {
      console.log(`user saved post ${this.post.id}`);
      this.postService.save(this.post.id, true).subscribe(success => console.log(success), error => console.log(error));
      this.post.userSaved = true;
    }
  }

  ngOnInit() {
  }

  private vote(voteType: VotedType) {
    if (this.post.userVote === voteType) {
      console.log(`user voted ${VotedType[voteType]}, but post ${this.post.id} already had that vote type`);
      return;
    }
    let hasDownvote = false;
    let hasUpvote = false;

    console.log(`post ${this.post.id} had a vote of ${VotedType[this.post.userVote]} previously.`);
    if (this.post.userVote === VotedType.Down) {
      hasDownvote = true;
    }
    if (this.post.userVote === VotedType.Up) {
      hasUpvote = true;
    }

    console.log(`user voted ${VotedType[voteType]} post ${this.post.id}`);
    this.postService.vote(this.post.id, voteType);

    if (voteType === VotedType.Up) {
      if (hasDownvote) {
        this.post.downvotes--;
      }
      this.post.upvotes++;
      this.post.userVote = VotedType.Up;
    }

    if (voteType === VotedType.Down) {
      if (hasUpvote) {
        this.post.upvotes--;
      }
      this.post.downvotes++;
      this.post.userVote = VotedType.Down;
    }
  }
}
