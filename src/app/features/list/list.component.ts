import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { Product } from '../../shared/interfaces/product.interface';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';
import { ProductsService } from '../../shared/services/products.service';
import { CardComponent } from './components/card/card.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  products: Product[] = [];

  productService = inject(ProductsService);
  confirmationDialogService = inject(ConfirmationDialogService);

  router = inject(Router);

  constructor() {
    this.productService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  onEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id]);
  }

  onDelete(product: Product) {
    this.confirmationDialogService
      .openDialog()
      .pipe(filter((answer) => answer))
      .subscribe(() => {
        this.productService.delete(product.id).subscribe(() => {
          this.productService.getAll().subscribe((products) => {
            this.products = products;
          });
        });
      });
  }
}
