import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from './../environments/environment';
import { MessageService } from './message.service';
import { Article } from './models/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private drupalRestArticles = `${environment.drupal.url}${
    environment.drupal.rest
  }${environment.drupal.type.articles}`;
  private drupalRestArticle = `${environment.drupal.url}${
    environment.drupal.type.article
  }`;
  constructor(
    private messageService: MessageService,
    private httpClient: HttpClient,
  ) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`ArticleService: ${message}`);
  }

  getArticles(): Observable<Article[]> {
    return this.httpClient
      .get<Article[]>(`${this.drupalRestArticles}${environment.drupal.format}`)
      .pipe(
        tap(articles => {
          // console.log(articles);
          return this.log('fetched articles');
        }),
        catchError(this.handleError('getArticles', [])),
      );
  }
  getArticle(id: number): Observable<Article> {
    return this.httpClient
      .get<Article>(
        `${this.drupalRestArticle}/${id}${environment.drupal.format}`,
      )
      .pipe(
        tap(article => {
          // console.log(article);
          return this.log(`fetched article (id:${id})`);
        }),
        catchError(this.handleError<Article>(`getArticle id:${id}`)),
      );
  }
  postArticle(body: any): Observable<Article> {
    return this.httpClient
      .post<Article>(
        'http://localhost:8888/drupal/node?_format=hal_json',
        body,
        {
          headers: new HttpHeaders({
            'Authorization': 'Basic Y21zZGV2LXVzZXI6Y21zZGV2LXBhc3M=',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-Token': 'eVtzwgG7-U5JjKQ169Ku_NdfNFSpXGmPinALuYd3AqE',
          })
        }
      )
      .pipe(
        tap(article => {
          console.log(article);
          return this.log(`Succesfully created an article. ${article.title[0].value}`);
        }),
        catchError(this.handleError<Article>()),
      );
  }
  createArticleFormGroup(title?: string, body?: string): FormGroup {
    return new FormGroup({
      title: new FormControl(title && title),
      body: new FormControl(body && body),
    });
  }
}
