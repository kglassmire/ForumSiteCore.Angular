import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreatePostVM } from '../api.service';
import { PostService } from '../api.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.createPostForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      url: new FormControl(''),
      forumName: new FormControl('')
    });
  }

  createPost() {
    const createPostDto: CreatePostVM = <CreatePostVM> {
      title: this.createPostForm.controls['title'].value,
      description: this.createPostForm.controls['description'].value,
      url: this.createPostForm.controls['url'].value,
      forumName: this.createPostForm.controls['forumName'].value
    };
    this.postService.create(createPostDto).subscribe(x => console.log(x), error => console.log(error));
    this.createPostForm.reset();
  }


}
