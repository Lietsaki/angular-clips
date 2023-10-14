import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}

// Services can be injected in 3 ways:
// 1) At the global level with the providedIn: 'root' option. This is the most common one.
// 2) At the module level (with the providers array of mymodule.module.ts)
// 3) At the component level (wit the providers array of mycomponent.component.ts)

// When injected in the first way, services have no access to lifecycle hooks.
// They do when inserted at the component level. Not sure about module level.
// So, the safest thing to do is to assume service data will persist even after the components
// that use such service are destroyed. We should then responsibly manage data in our services.
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public modals: IModal[] = [];

  constructor() {}

  register(id: string) {
    this.modals.push({
      id,
      visible: false,
    });
  }

  unregister(id: string) {
    this.modals = this.modals.filter((modal) => modal.id !== id);
  }

  isModalOpen(id: string) {
    return !!this.modals.find((modal) => modal.id === id)?.visible;
  }

  toggleModal(id: string) {
    const targetModal = this.modals.find((modal) => modal.id === id);

    if (targetModal) {
      targetModal.visible = !targetModal.visible;
    }
  }
}
