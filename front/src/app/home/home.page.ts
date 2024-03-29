import { ip } from "./../global";
import { DepositModalComponent } from "./deposit-modal/deposit-modal.component";
import { CalendarModalComponent } from "./calendar-modal/calendar-modal.component";
import { ModalController } from "@ionic/angular";
import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Clipboard } from "@angular/cdk/clipboard";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController,
    private _router: Router,
    private clipboard: Clipboard
  ) {
    this.getAll();
  }
  datas: any;

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getAll() {
    this.http.get(`${ip}all`).subscribe((res) => {
      console.log("res", res);
      this.datas = res;
    });
  }

  removeImage(id) {
    fetch(`${ip}remove/${id}`, {
      headers: new Headers({
        Accept: "application/json",
      }),
    });
    this.makeTable();
  }

  resetImage(id) {
    fetch(`${ip}reset/${id}`, {
      headers: new Headers({
        Accept: "application/json",
      }),
    });
    this.makeTable();
  }

  history(id) {
    this.http.get(`${ip}history/${id}`).subscribe((res) => {
      console.log("res", res);
      return res;
    });
  }

  makeTable() {
    // window.location.reload();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: DepositModalComponent,
    });
    await modal.present();
  }

  async calendar(key) {
    const modal = await this.modalCtrl.create({
      component: CalendarModalComponent,
    });
    await modal.present();
    console.log(key);
  }
  copyImg(id) {
    this.clipboard.copy(`${ip}openimage/${id}`);
  }
}
