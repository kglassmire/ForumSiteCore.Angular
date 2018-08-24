import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor() { }

  ngOnInit() {
/*     this.forumPostListing$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        console.log(params);
        return this.forumService.hot(params.get('name'));
      })); */
  }

}
