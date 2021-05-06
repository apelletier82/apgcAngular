import { Component, Input } from '@angular/core';

@Component({
  selector: 'apgc-label-field-display',
  templateUrl: './label-field-display.component.html',
  styleUrls: ['./label-field-display.component.scss']
})
export class LabelFieldDisplayComponent {
  @Input() fieldLabel: string;
  @Input() fieldValue: string;
}
