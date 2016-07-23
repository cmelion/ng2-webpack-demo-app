declare var componentHandler: any;

import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ItemsService} from '../../services/api/items';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {ItemDetailComponent} from './components/item-detail';
import {ItemListComponent} from './components/item-list';

export interface Item {
    id: number;
    name: string;
    description: string;
}

export interface AppStore {
    items: Item[];
    selectedItem: Item;
}


//-------------------------------------------------------------------
// HOME COMPONENT
//-------------------------------------------------------------------
@Component({
    selector: 'home',
    providers: [],
    template: require('./template.html'),
    styles: [require('./style.scss')],
    directives: [ItemListComponent, ItemDetailComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
    items: Observable<Array<Item>>;
    //TODO: Fix typing issue, should be Item ot any
    //selectedItem: Observable<Item>;
    selectedItem: Observable<any>;

    constructor(private itemsService: ItemsService, private store: Store<AppStore>) {

    }

    ngOnInit() {
        this.items = this.itemsService.items;
        this.selectedItem = this.store.select('selectedItem');
        this.selectedItem.subscribe(v => console.log(v));

        this.itemsService.loadItems();

    }

    ngAfterViewInit() {
        // Ensure material-design-lite effects are applied
        componentHandler.upgradeDom();
    }

    resetItem() {
        let emptyItem: Item = {id: null, name: '', description: ''};
        this.store.dispatch({type: 'SELECT_ITEM', payload: emptyItem});
    }

    selectItem(item: Item) {
        this.store.dispatch({type: 'SELECT_ITEM', payload: item});
    }

    saveItem(item: Item) {
        this.itemsService.saveItem(item);

        // Generally, we would want to wait for the result of `itemsService.saveItem`
        // before resetting the current item.
        this.resetItem();
    }

    deleteItem(item: Item) {
        this.itemsService.deleteItem(item);

        // Generally, we would want to wait for the result of `itemsService.deleteItem`
        // before resetting the current item.
        this.resetItem();
    }
}

