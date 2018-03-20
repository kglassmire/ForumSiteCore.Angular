import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { ForumService } from '../forum.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum-search',
  templateUrl: './forum-search.component.html',
  styleUrls: ['./forum-search.component.css']
})
export class ForumSearchComponent implements OnInit {
  public model: any;
  private clickedItem: string;
  private foundForums: string[];

  constructor(
    private forumService: ForumService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .switchMap(term => term.length < 2 ? []
        : this.forumService.forumSearch(term))

  selectedItem(event): void {
    this.router.navigateByUrl('/f/' + event.item);
  }

}
