//-------------------------------------------------------------------
// ITEM DETAIL
//-------------------------------------------------------------------
/* beautify ignore:start */
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Item} from '../../../../services/api/items';
/* beautify ignore:end */

@Component({
    selector: 'item-detail',
    styles: [require('./style.scss').toString()],
    template: require('./template.html')
})

export class ItemDetailComponent {
    @Input('item') _item: Item;
    originalName: string;
    selectedItem: Item;
    @Output() saved = new EventEmitter();
    @Output() cancelled = new EventEmitter();

    set _item(value: Item){
        if (value) {
            this.originalName = value.name;
        }
        this.selectedItem = Object.assign({}, value);
    }
}
