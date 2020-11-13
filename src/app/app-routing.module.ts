import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { RateComponent } from './rate/rate.component'
import { List1Component } from './list1/list1.component'
import { UploadComponent } from './upload/upload.component'
import { AppComponent } from "./app.component";


const routes: Routes = [

    { path: "", component: RateComponent},
   
   
    { path: "list",  component: List1Component},
    { path: "upload", component: UploadComponent }   

];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

