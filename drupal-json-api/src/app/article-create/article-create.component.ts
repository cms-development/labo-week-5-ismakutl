import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { Article } from '../models/article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css'],
})
export class ArticleCreateComponent implements OnInit {
  article: Article;
  articleCreateForm: FormGroup;
  submitted = false;

  constructor(
    private location: Location,
    private articleService: ArticleService
  ) {
    this.articleCreateForm = this.articleService.createArticleFormGroup('Article title', 'Article body text');
  }

  ngOnInit() {}
  goBack(): void {
    this.location.back();
  }
  get title() { return this.articleCreateForm.get('title'); }
  get body() { return this.articleCreateForm.get('body'); }
  onSubmit() {
    this.submitted = true;
    this.article = new Article();
    this.article.type = [{ target_id: 'article' }];
    this.article.title = [{ value: this.articleCreateForm.value.title }];
    this.article.body = [{ value: this.articleCreateForm.value.body }];
    // console.log('submitting...', this.article);
    this.articleService.postArticle(this.article).subscribe(() => {
      this.goBack();
    });
  }
}
