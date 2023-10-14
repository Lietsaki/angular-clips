import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(public modal: ModalService, public auth: AuthService) {}

  openAuthModal(e: Event) {
    e.preventDefault();
    this.modal.toggleModal('auth');
  }
}
