import {Component, OnInit} from '@angular/core';
import {Observable, empty } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap, map, catchError } from 'rxjs/operators';
import { ForumService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../services/alert.service';
import { AlertType } from '../../models/alert';

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
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => {
        return term.length < 2 ? [] : this.forumService.forumSearch(term).pipe(
          map((x) => {
            if (x.status === 'failure') {
              return [x.message];
            } else {
              return x.data;
            }
        }), catchError((err) => {
          this.alertService.handle500Error(err);
          this.alertService.alert(AlertType.Error, 'Error while searching', 'forum-search-component-search-error', false);
          return empty();
        }));
      }))


  selectedItem(event: NgbTypeaheadSelectItemEvent): void {
    event.preventDefault();
    this.router.navigateByUrl('/f/' + event.item);
    this.model = '';
  }

}
