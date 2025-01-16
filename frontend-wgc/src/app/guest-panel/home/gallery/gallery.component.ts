import { Component, inject, OnInit } from '@angular/core';
import { GalleryModule, ImageItem, GalleryItem, Gallery } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';

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


  ngOnInit() {
    for(let i=0; i<28;i++){
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
}
