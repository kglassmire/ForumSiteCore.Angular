import { Component, OnInit } from '@angular/core';
import { ForumDto, ForumService } from '../forum.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  forumDto: ForumDto;
  isInitialized: Boolean;

  getForum(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.forumService.get(id)
      .subscribe(data => this.forumDto = data);
  }

  constructor(
    private forumService: ForumService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getForum();
    this.isInitialized = true;
  }

}
