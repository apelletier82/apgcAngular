import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BackendService } from '../shared/services/backend.service';
import { AppMenu } from './app-menu';

@Injectable({
    providedIn: 'root',
})
export class AppMenuService implements OnDestroy {
    private readonly emptyMenu: AppMenu = {
        home: {
            id: 1,
            caption: '',
            routerLink: 'home',
        },
        categories: [],
    };

    private menuSubject = new BehaviorSubject<AppMenu>(null);

    constructor(private backendService: BackendService) {}

    ngOnDestroy(): void {
        this.menuSubject.complete();
    }

    getMenu$(): Observable<AppMenu> {
        return this.menuSubject?.value
            ? this.menuSubject.asObservable()
            : this.backendService.get<AppMenu>(`${environment.assets}${environment.menu}`).pipe(
                  tap((result) => this.menuSubject.next(result)),
                  map((result) => result ?? this.emptyMenu)
              );
    }
}
