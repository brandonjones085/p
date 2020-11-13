import { transition } from '@angular/animations';
import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import * as imagepicker from "nativescript-imagepicker";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Post } from '../pup.model'
import { PupService } from "../pup.service";
import { Observable } from '@nativescript/core';


@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  moduleId: module.id
})

export class UploadComponent implements OnInit {
  constructor(
    private router: RouterExtensions,public postsService: PupService,
    private fb: FormBuilder
  ) {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
      validators: [Validators.required],
      
      })
    });
  
  }
  form: FormGroup;
  enteredTitle = "";
  enteredContent = "";
  post: Post;
  isLoading = false;
  imageAssets = [];
  imageSrc: any;
  isSingleMode: boolean = true;
  thumbSize: number = 80;
  previewSize: number = 300;
  img: string
 file; 
  imagePreview: string;
  private mode = "create";
  private postId: string;

  ngOnInit() {
    

  }

  onSave(){
    console.log("clicked")
    this.proccessImageUpload(this.file);
  }



public onSelectSingleTap() {
  this.isSingleMode = true;

  let context = imagepicker.create({
      mode: "single"
  });
  this.startSelection(context);
}

private startSelection(context) {
  let that = this;

  context
  .authorize()
  .then(() => {
      that.imageAssets = [];
      that.imageSrc = null;
      return context.present();
  })
  .then((selection) => {
     console.log("Selection done: " + JSON.stringify(selection));
     this.file = selection[0]._android;    
    
     
    
      that.imageSrc = that.isSingleMode && selection.length > 0 ? selection[0] : null;

      // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
      selection.forEach(function (element) {
          element.options.width = that.isSingleMode ? that.previewSize : that.thumbSize;
          element.options.height = that.isSingleMode ? that.previewSize : that.thumbSize;
      });

      that.imageAssets = selection;
  }).catch(function (e) {
      console.log(e);
  });
}

  // proccess image function
proccessImageUpload(fileUri) {
  var backgroundHttp  = require("nativescript-background-http");
  return new Promise((resolve, reject) => {
      // body...
      var request = {
          url: 'http://35.165.251.254:4000/api/posts',
          method: "POST",
          headers: {
              "Content-Type": "application/octet-stream",
              "user_id": "<user_id>"
          },
          description: 'Uploading profile image..',
          androidAutoDeleteAfterUpload: false,
          androidNotificationTitle: 'Profile image'
      }

      var params = [
        { name: "title", value: this.form.value.title},
        { name: "content", value: this.form.value.content },
        { name: "rates", value: 0 },
        { name: "image", filename: fileUri, mimeType: "image/jpeg" }
     ];

     var session = backgroundHttp.session('image');
     var task = session.multipartUpload(params, request);

      task.on("progress", (e) => {
          // console log data
          console.log(`uploading... ${e.currentBytes} / ${e.totalBytes}`);
      });

      task.on("error", (e) => {
          // console log data
          console.log(`Error processing upload ${e.responseCode} code.`);
          reject(`Error uploading image!`);
      });

      task.on("responded", (e) => {
          // console log data
          console.log(`received ${e.responseCode} code. Server sent: ${e.data}`);
          // var uploaded_response = JSON.parse(e.data);
      });

      task.on("complete", (e) => {
          // console log data
          console.log(`upload complete!`);
          console.log(`received ${e.responseCode} code`);
          // console.log(e.data);
      })

      resolve(task);
  });
}





  }
