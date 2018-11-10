import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    console.log('Getting articles...');
    return this.httpClient
      .get<Article[]>(`${this.drupalRestArticles}${environment.drupal.format}`)
      .pipe(
        tap(articles => {
          console.log(articles);
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
          console.log(article);
          return this.log(`fetched article (id:${id})`);
        }),
        catchError(this.handleError<Article>(`getArticle id:${id}`)),
      );
  }
}
