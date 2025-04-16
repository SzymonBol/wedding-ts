import { Component, inject, OnInit } from '@angular/core';
import { GalleryModule, ImageItem, GalleryItem, Gallery } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { LogMessageServce } from '../../../services/log-message.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [GalleryModule, LightboxModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class TSGalleryComponent implements OnInit {
  images: GalleryItem[] = [];
  gallery = inject(Gallery);
  logMessageSrv = inject(LogMessageServce);

  ngOnInit() {
    for(let i=0; i<30;i++){
      const src = `gallery/big/gallery-img-${i}.jpg`;
      const thumb = `gallery/small/gallery-img-${i}.jpg`;

      this.images.push(
        new ImageItem({ 
          src, 
          thumb
        }),
      )
    }

    const galleryRef = this.gallery.ref();
    galleryRef.load(this.images);
  }

  logClick(){
    this.logMessageSrv.logMessage({text: 'Clicked on photo in home page', severity: 'info'});
  }
}
