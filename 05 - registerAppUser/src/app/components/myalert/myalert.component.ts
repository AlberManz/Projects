import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-myalert',
  templateUrl: './myalert.component.html',
  styleUrls: ['./myalert.component.css']
})
export class MyalertComponent {

  @Input() message: string = ""
  @Input() viewAlert: boolean = false;
  @Input() typeAlert: string = ""

  closeAlert(): void {
    this.viewAlert = !this.viewAlert;
  }
}
