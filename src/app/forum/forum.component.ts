import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ForumDto, ForumService } from '../forum.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { MarkdownService } from '../markdown.service';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  forumDto$: Observable<ForumDto>;
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
    this.forumDto$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.forumService.get(+params.get('id')));

    this.forumDto$.subscribe((v) => console.log('got new forumDto: ', v));
  }

}
