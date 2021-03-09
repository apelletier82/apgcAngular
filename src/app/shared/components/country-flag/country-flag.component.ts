import { Component, Input } from '@angular/core';

export const defaultCountryFlagSize = 24;

@Component({
  selector: 'apgc-country-flag',
  templateUrl: './country-flag.component.html',
  styleUrls: ['./country-flag.component.scss'],
})
export class CountryFlagComponent {
  @Input() countryIsoCode: string;
  @Input() size = defaultCountryFlagSize;

  private getSize(): number {
    return this.size ? this.size : defaultCountryFlagSize;
  }

  public getStyleSizeInPixel() {
    return {
      height: this.getSize().toString() + 'px',
      width: this.getSize().toString() + 'px',
    };
  }
}
