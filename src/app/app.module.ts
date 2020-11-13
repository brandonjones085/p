import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RateComponent } from './rate/rate.component'
import { ListComponent} from './list/list.component'
import { List1Component} from './list1/list1.component'
import { UploadComponent } from './upload/upload.component'
import { ActionBarComponent } from './action-bar/action-bar.component'
import { ReactiveFormsModule } from '@angular/forms';
import { NativeScriptFormsModule } from "@nativescript/angular";



@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
    
        NativeScriptModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        NativeScriptFormsModule 
      
    ],
    declarations: [
        AppComponent,
        RateComponent, 
        UploadComponent, 
        ListComponent, 
        List1Component, 
        ActionBarComponent
     
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
