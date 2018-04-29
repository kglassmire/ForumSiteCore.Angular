import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ForumService, ForumPostListing } from '../api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { MarkdownService } from '../markdown.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})

export class ForumComponent implements OnInit {

  forumPostListing$: Observable<ForumPostListing>;

  constructor(
    private forumService: ForumService,
    private route: ActivatedRoute,
    private router: Router,
    private markdownService: MarkdownService
  ) { }

  convertMarkdown(markdown: string) {
    return this.markdownService.markdownHtml(markdown);
  }

  ngOnInit() {
    this.forumPostListing$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        console.log(params);
        return this.forumService.hot(params.get('name'));
      });
  }

}
