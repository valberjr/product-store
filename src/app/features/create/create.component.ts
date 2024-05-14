import { Component, inject } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BackToListComponent } from '../../shared/components/back-to-list/back-to-list.component';
import { FormComponent } from '../../shared/components/form/form.component';
import { Product } from '../../shared/interfaces/product.interface';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormComponent, BackToListComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  matSnackBar = inject(MatSnackBar);
  productService = inject(ProductsService);
  router = inject(Router);

  onSubmit(product: Product) {
    this.productService.post(product).subscribe(() => {
      this.matSnackBar.open('Product created successfully', 'Ok');

      this.router.navigateByUrl('/');
    });
  }
}
