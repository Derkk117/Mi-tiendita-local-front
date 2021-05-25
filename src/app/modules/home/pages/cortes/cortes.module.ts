import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CortesRoutingModule } from '../cortes/cortes-routing.module';
import { CortesComponent } from '../cortes/cortes/cortes.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule} from '@angular/material/button';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule} from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CortesCreateComponent } from './cortes-create/cortes-create.component';
import { CortesEditComponent } from './cortes-edit/cortes-edit.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [CortesComponent, CortesCreateComponent, CortesEditComponent],
  imports: [
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    CommonModule,
    CortesRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    MatListModule,
    MatSelectModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass :'toast-top-right'
    })
  ]
})
export class HomeModule { }
