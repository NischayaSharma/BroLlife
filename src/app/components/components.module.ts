import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ChatboxComponent } from "./chatbox/chatbox.component";
import { HeaderComponent } from "./header/header.component";


@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
    declarations: [HeaderComponent, ChatboxComponent],
    exports: [HeaderComponent, ChatboxComponent],
})
export class ComponentsModule {}