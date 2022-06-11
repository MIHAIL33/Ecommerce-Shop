import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ProductsSearchComponent } from './components/products-search/products-search.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
      ProductsSearchComponent
    ],
    exports: [ProductsSearchComponent]
})
export class ProductsModule {}
