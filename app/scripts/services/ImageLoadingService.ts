import { Service } from '../lib/Service';

export class ImageLoadingService extends Service {

    static BACKGROUND_IMAGE_SRC_ATTRIBUTE = 'data-background-src';
    static IMAGE_SRC_ATTRIBUTE = 'data-src';

    lazyLoadImages(root: Element = document.body) {
        this.loadBackgroundImages(root);
        this.loadImages(root);
    }

    loadImages(root: Element = document.body) {
        let imageElements = root.querySelectorAll('['+ImageLoadingService.IMAGE_SRC_ATTRIBUTE+']');
        for (let i = 0, max = imageElements.length; i < max; i++) {
            let element = imageElements[i];
            let src = element.getAttribute(ImageLoadingService.IMAGE_SRC_ATTRIBUTE);
            element.removeAttribute(ImageLoadingService.IMAGE_SRC_ATTRIBUTE);
            element.setAttribute('src', src);
        }
    }    

    loadBackgroundImages(root: Element = document.body) {
        let imageElements = root.querySelectorAll('['+ImageLoadingService.BACKGROUND_IMAGE_SRC_ATTRIBUTE+']');
        for (let i = 0, max = imageElements.length; i < max; i++) {
            let element = imageElements[i];
            let src = element.getAttribute(ImageLoadingService.BACKGROUND_IMAGE_SRC_ATTRIBUTE);
            element.removeAttribute(ImageLoadingService.BACKGROUND_IMAGE_SRC_ATTRIBUTE);
            element.setAttribute('style', 'background-image: url(' + src + ')');
        }
    }
}