import { DataService } from 'src/app/services/data.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent{

  _avatarUrl: SafeResourceUrl | undefined;
  uploading = false;

  @Input()
  set avatarUrl(url: string | undefined) {
    if (url) {
      this.downloadImage(url);
    }
  }

  @Output() upload = new EventEmitter<string>();

  constructor(private readonly supabase: DataService, private readonly dom: DomSanitizer) {}

  async downloadImage(path: string) {
    try {
      const data = Blob.caller(await this.supabase.downLoadImage(path));
      
      this._avatarUrl = this.dom.bypassSecurityTrustResourceUrl(URL.createObjectURL(data));
    } catch (error) {
      console.error('Error downloading image: ', error);
    }
  }

  async uploadAvatar(event: any) {
    try {
      this.uploading = true;
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      await this.supabase.uploadAvatar(filePath, file);
      this.upload.emit(filePath);
    } catch (error) {
      alert(error);
    } finally {
      this.uploading = false;
    }
  }

}
