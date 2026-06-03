import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacultadService } from '../../services/facultad.service';
import { Facultad } from '../../models/facultad.model';

@Component({
  selector: 'app-facultad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './facultad.component.html',
})
export class FacultadComponent implements OnInit {

  form!: FormGroup;
  facultades: Facultad[] = [];
  loading = false;
  mensaje = '';

  constructor(private fb: FormBuilder, private service: FacultadService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre:    ['', Validators.required],
      decano:    ['', Validators.required],
      ubicacion: ['', Validators.required],
    });
    this.cargarFacultades();
  }

  cargarFacultades(): void {
    this.service.listar().subscribe({
      next: (res) => this.facultades = res.data,
      error: () => this.mensaje = 'Error al cargar facultades'
    });
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    this.service.crear(this.form.value).subscribe({
      next: () => {
        this.mensaje = '¡Facultad registrada exitosamente!';
        this.form.reset();
        this.cargarFacultades();
        this.loading = false;
      },
      error: () => {
        this.mensaje = 'Error al registrar la facultad';
        this.loading = false;
      }
    });
  }
}
