import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProfilePageRoutingModule } from "./profile-routing.module";

import { ProfilePage } from "./profile.page";
import { ComponentsModule } from "../../components/components.module";
import { PreviewAnyFile } from "@ionic-native/preview-any-file/ngx";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ProfilePage],
  providers: [PreviewAnyFile],
})
export class ProfilePageModule {}
