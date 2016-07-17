import { Controller } from '../lib/Controller';

export class AppController extends Controller {

    static selector: string = '.selector';

    constructor(element: HTMLElement) {
        super(element);

    }
}
