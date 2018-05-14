import { Component, Input, OnInit } from '@angular/core';
import { PostDto, ForumDto, VotedType, PostService } from '../api.service';
import { MarkdownService } from '../markdown.service';

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

  private _showPostDescription: boolean;

  constructor(
    private postService: PostService,
    private markdownService: MarkdownService
  ) { }

  togglePostDescription(): void {
    this._showPostDescription = !this._showPostDescription;
  }
  get showPostDescription(): boolean {
    return this._showPostDescription;
  }

  get showForumName(): boolean {
    return this.forum.name.toLowerCase() === 'all' || this.forum.name.toLowerCase() === 'home';
  }

  get totalScoreTitle(): string {
    return `${this.post.upvotes - this.post.downvotes} (${this.post.upvotes}|${this.post.downvotes})`;
  }

  convertMarkdown(markdown: string) {
    return this.markdownService.markdownHtml(markdown);
  }

  upvote(): void {
    this.vote(VotedType.Up);
  }

  downvote(): void {
    this.vote(VotedType.Down);
  }

  save(): void {
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

  private vote(voteType: VotedType): void {
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
    this.postService.vote(this.post.id, voteType).subscribe(success => console.log(success), error => console.log(error));;

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
