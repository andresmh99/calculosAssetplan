import { Routes } from '@angular/router';
import { AguaCalienteComponent } from './components/agua-caliente/agua-caliente.component';
import { SalvoconductoComponent } from './components/salvoconducto/salvoconducto.component';
import { DescuentosComponent } from './components/descuentos/descuentos.component';

export const routes: Routes = [
    {
        path: 'agua-caliente',
        component: AguaCalienteComponent
    },
    {
        path: 'salvoconducto',
        component: SalvoconductoComponent
    },
    {
        path: 'descuentos',
        component: DescuentosComponent
    }
];
