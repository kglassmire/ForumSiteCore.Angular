import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ForumService } from '../api.service';
import { Router } from '@angular/router';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forum-search',
  templateUrl: './forum-search.component.html',
  styleUrls: ['./forum-search.component.css']
})
export class ForumSearchComponent implements OnInit {
  public model: string;
  private clickedItem: string;
  private foundForums: string[];

  constructor(
    private forumService: ForumService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => term.length < 2 ? []
        : this.forumService.forumSearch(term)))


  selectedItem(event: NgbTypeaheadSelectItemEvent): void {
    event.preventDefault();
    this.router.navigateByUrl('/f/' + event.item);
    this.model = '';
  }

}
