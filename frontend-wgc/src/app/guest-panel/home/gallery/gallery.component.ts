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
  imagesUrls :string[] =[];


  ngOnInit() {
    for(let i=0; i<28;i++){
      const fileName = `gallery/gallery-img-${i}.jpg`;

      this.imagesUrls.push(fileName);
      this.images.push(
        new ImageItem({ 
          src: fileName, 
          thumb: fileName
        }),
      )
    }

    const galleryRef = this.gallery.ref();
    galleryRef.load(this.images);
  }
}
