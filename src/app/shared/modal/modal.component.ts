import { Component, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  // Specific services to use in this component
  // providers: [ModalService],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input({ required: true }) modalID = '';

  // Adding public or private is necessary in order for the dependency to be injected correctly
  // This way we say "make available this service that has providedIn: root"
  constructor(public modal: ModalService, public el: ElementRef) {}

  ngOnInit(): void {
    // ElementRef returns a ref to the dom element of this component.
    // We can then move it somewhere else to simulate react's portals
    // and prevent our modal from being affected by its parent styles.
    // This is possible even when app-modal (this component) is contained in other
    // components like app-auth-modal.
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy() {
    document.body.removeChild(this.el.nativeElement);
  }

  closeModal() {
    this.modal.toggleModal(this.modalID);
  }
}
