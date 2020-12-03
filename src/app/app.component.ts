import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {
    Router,
    Event,
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    NavigationStart,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AppService } from './app.service';

@Component({
    selector: 'apgc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    private routerSubscription: Subscription;
    private sideNavClosing = false;

    title = 'apgc';
    @ViewChild(MatSidenav) sideNav: MatSidenav;

    get isLoading$(): Observable<boolean> {
        return this.appService.loading$;
    }

    private closeSideNav() {
        if (this.sideNav?.opened) {
            this.sideNav?.close();
        }
    }
    private checkRouterEvent(event: Event) {
        if (event instanceof NavigationStart) {
            this.closeSideNav();
            this.appService.beginLoading();
        } else if (
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError
        ) {
            this.appService.endLoading();
        }
    }

    constructor(private appService: AppService, private router: Router) {}

    ngOnDestroy(): void {
        this.routerSubscription?.unsubscribe();
    }

    ngOnInit(): void {
        this.routerSubscription = this.router.events.subscribe(
            (routerEvent: Event) => this.checkRouterEvent(routerEvent)
        );
    }
}
