import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BackendService } from '../shared/services/backend.service';
import { AppMenu } from './app-menu';

@Injectable({
  providedIn: 'root'
})
export class AppMenuService {
  private readonly emptyMenu: AppMenu = {
    home: {
      id: 1,
      caption: '',
      routerLink: 'home'
    },
    categories: []
  };

  constructor(private backendService: BackendService) { }

  getMenu$(): Observable<AppMenu> {
    return this.backendService.get<AppMenu>(`${environment.assets}${environment.menu}`)
      .pipe(map(result => result ?? this.emptyMenu ));
  }
}
