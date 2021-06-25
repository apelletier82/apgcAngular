import { Component, Input } from '@angular/core';

@Component({
  selector: 'apgc-flag-location',
  templateUrl: './flag-location.component.html',
  styleUrls: ['./flag-location.component.scss'],
})
export default class FlagLocationComponent {
  @Input() countryIsoCode: string;

  @Input() location: string;

  @Input() flagSize: number;
}
