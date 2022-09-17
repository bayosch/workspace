import { Component, Input, OnChanges, ViewEncapsulation, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import {AdminService} from './admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss',
    '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnChanges {

  @Input() location!: string;
  @Input() unit!: string;
  public errText!: any;
  public weathersubscription!: Subscription;
  public temp!: number;
  public desc!: string;
  public weatherico!: string;
  public country!: string;
  public city!: string;
  public dt!: Date;

  constructor(
    public ws: AdminService,
    private modalService: NgbModal
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['location'] || changes['unit']){
      if (this.weathersubscription) {
        this.weathersubscription.unsubscribe();
      }
      this.renderWeather();
    }
  }

  open(modal: any): void {
    this.modalService.open(modal);
  }

  renderWeather(): void {
    this.weathersubscription = this.ws.getWeather(this.location, this.unit).subscribe((data) => {
      this.errText = '';
      this.temp = Math.round(data.main.temp);
      this.desc = data.weather[0].description;
      this.weatherico = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
      this.city = data.name;
      this.country = data.sys.country;
      this.getLocalTime(data.coord.lat, data.coord.lon);

    }, error => {
      this.errText = error;
    });
  }

  getLocalTime(lat: number, long: number): void {
    this.ws.getLocalTime(lat, long).subscribe((data) => {
      this.dt = data.time;
    });
  }

}
