import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  // Declare AuthModalComponent so we can express it "belongs" to this module, otherwise we wouldn't be able to export it.
  // This is because AuthModalComponent doesn't have a module of its own that defines it, unlike Shared module, so we're able to export
  // SharedModule without declaring it here first.

  // ? Also, all components you put here have access to each other in their templates. For example, you can use
  // ? <app-login> in <app-auth-modal>
  declarations: [AuthModalComponent, LoginComponent, RegisterComponent],

  // Export AuthModalComponent so other modules that import UserModule can use the component defined there (<app-auth-modal></app-auth-modal>)
  exports: [AuthModalComponent],
  // We need to import SharedModule because that module exports ModalComponent, and AuthModalComponent uses it in its template (app-modal).
  imports: [CommonModule, SharedModule, ReactiveFormsModule, FormsModule],
})
export class UserModule {}
