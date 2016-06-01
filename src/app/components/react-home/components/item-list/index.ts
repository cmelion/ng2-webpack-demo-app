//-------------------------------------------------------------------
// ITEM-LIST
//-------------------------------------------------------------------
/* beautify ignore:start */
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Item} from '../../../../services/api/items';
/* beautify ignore:end */

@Component({
    selector: 'items-list',
    styles: [require('./style.scss').toString()],
    template: require('./template.html')
})
export class ItemListComponent {
    @Input() items: Item[];
    @Output() selected = new EventEmitter();
    @Output() deleted = new EventEmitter();
}
