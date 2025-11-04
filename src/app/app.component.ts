import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import {shakeX, pulse, jello} from "ng-animate";

const DEATH_DURATION_SECONDS = 0.5;
const ATTACK_PULSE_DURATION_SECONDS = 0.3;
const PREATTACK_JELLO_DURATION_SECONDS = 0.5;
const HIT_WOBBLE_DURATION_SECONDS = 0.3;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  animations: [
    trigger("death", [transition(":increment", useAnimation(shakeX, { params: { timing: DEATH_DURATION_SECONDS }}))]),
    trigger("attack", [transition(":increment", useAnimation(pulse, { params: { timing: ATTACK_PULSE_DURATION_SECONDS, scale: 4.5 }}))]),
    trigger("preAttack", [transition(":increment", useAnimation(jello, { params: { timing: PREATTACK_JELLO_DURATION_SECONDS }}))]),
  ],

  styleUrls: ['./app.component.css']
})
export class AppComponent {
  slimeIsPresent = false;

  ng_death = 0;
  ng_attack = 0;
  ng_preAttack = 0;
  css_hit = false;

  constructor() {
  }

  spawn() {
    this.slimeIsPresent = true;
    this.showSlime();
  }

  death(){
    this.slimeIsPresent = false;
    this.ng_death++;
    this.hideSlime();
  }

  attack(){
    this.ng_preAttack++;
    setTimeout(() => this.ng_attack++, 200);
  }

  hit(){
    this.css_hit = true;
    setTimeout(() => this.css_hit = false, HIT_WOBBLE_DURATION_SECONDS * 1000);
  }

  // Ajouter
  showSlime() {
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeOut");
    element?.classList.add("fadeIn");
  }

  hideSlime() {
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeIn");
    element?.classList.add("fadeOut");
  }
}
