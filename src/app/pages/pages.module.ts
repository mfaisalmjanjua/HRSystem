import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CoreComponent } from './core/core.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { LeftComponent } from './common/left/left.component';
import { RightComponent } from './common/right/right.component';
import { AuthComponent } from './component/auth/auth.component';
import { SharedModule } from '../_shared/services/shared.service';

@NgModule({
  declarations: [
    CoreComponent,
    HeaderComponent,
    FooterComponent,
    LeftComponent,
    RightComponent,
    AuthComponent,
  ],
  imports: [CommonModule, PagesRoutingModule, SharedModule],
})
export class PagesModule {}
