import { TempFileInfo } from './../interfaces/localFile';
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, FileInfo, Filesystem } from '@capacitor/filesystem';
import { LoadingController, Platform } from '@ionic/angular';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.prod';
import { FILE_DB, IMAGE_DIR, LocalFile } from '../interfaces/localFile';
import { AuthService } from './auth.service';




@Injectable({
  providedIn: 'root'
})
export class FileService {
  // images: LocalFile[] = [];
  
  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private supabase: SupabaseClient,
    private userService: AuthService
  ) { 
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

  }


  async loadFiles(images:LocalFile[]) {
    // this.images = [];

    const loading = await this.loadingCtrl.create({
      message: 'Loading data...'
    });
    await loading.present();

    Filesystem.readdir({
      path: IMAGE_DIR,
      directory: Directory.Data
    })
      .then(
        (result) => {
          this.loadFileData(result.files,images);
        },
        async (err) => {
          // Folder does not yet exists!
          await Filesystem.mkdir({
            path: IMAGE_DIR,
            directory: Directory.Data
          });
        }
      )
      .then((_) => {
        loading.dismiss();
      });
  }

  // Get the actual base64 data of an image
  // base on the name of the file
  async loadFileData(fileNames: FileInfo[],images:LocalFile[]) {
    for (let f of fileNames) {
      const filePath = `${IMAGE_DIR}/${f.name}`;

      const readFile = await Filesystem.readFile({
        path: filePath,
        directory: Directory.Data
      });

      images.push({
        name: f.name,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`
      });
    }
    
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos // Camera, Photos or Prompt!
    });
    console.log(image)
    if (image) {
      this.saveImage(image)
    }
  }

  // Create a new file from a capture image
  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Data
    });
    console.log(savedFile);
    // Reload the file list
    // Improve by only loading for the new image and unshifting array!
    // this.loadFiles();
  }

  // https://ionicframework.com/docs/angular/your-first-app/3-saving-photos
  private async readAsBase64(photo: Photo) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: <string>(photo.path)
      });

      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }

  // Helper function
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });


  async uploadFile(cameraFile: Photo, info: TempFileInfo): Promise<any> {
    let file = null;

    // Retrieve a file from the URI based on mobile/web
    if (this.platform.is('hybrid')) {
      const data = await Filesystem.readFile({
        path: <string>(cameraFile.path)
      });

      file = await this.dataUrlToFile(data.data);
    } else {
      const blob = await fetch(cameraFile.webPath!).then(r => r.blob());
      file = new File([blob], 'myfile', {
        type: blob.type,
      });
    }

    const time = new Date().getTime();
    const bucketName = info.private ? 'private' : 'public';
    const fileName = `${this.supabase.auth.user()?.id}-${time}.webp`;

    // Upload the file to Supabase
    const { data, error } = await this.supabase
      .storage
      .from(bucketName)
      .upload(fileName, file);

    info.file_name = fileName;
    // Create a record in our DB
    return this.saveFileInfo(info);
  }

  // Create a record in our DB
  async saveFileInfo(info: TempFileInfo): Promise<any> {
    const newFile = {
      user_id: this.supabase.auth.user()?.id,
      title: info.title,
      private: info.private,
      file_name: info.file_name
    };

    return this.supabase.from(FILE_DB).insert(newFile);
  }

  // Helper
  private dataUrlToFile(dataUrl: string, fileName: string = 'myfile'): Promise<File> {
    return fetch(`data:image.webp;base64,${dataUrl}`)
      .then(res => res.blob())
      .then(blob => {
        return new File([blob], fileName, { type: 'image.webp' })
      })
  }

}
