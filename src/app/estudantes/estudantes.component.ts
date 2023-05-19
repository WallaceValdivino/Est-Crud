import { EstudanteService } from '../estudantes.service';

import { Component, OnInit } from '@angular/core';

import {Estudante } from '../estudantes';

import { Form, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-estudantes',

  templateUrl: './estudantes.component.html',

  styleUrls: ['./estudantes.component.css'],
})
export class EstudantesComponent implements OnInit {
  Estudantes: Estudante[] = [];
isEditing : boolean = false;
  formGroupEstudante: FormGroup;

  constructor(
    private EstudanteService: EstudanteService,
    private formsBuilder: FormBuilder
  ) {
    this.formGroupEstudante = formsBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      location: [''],
      cpf: [''],
    });
  }

  ngOnInit(): void {
    this.loadEstudantes();
  }

  loadEstudantes() {
    this.EstudanteService.getEstudantes().subscribe({
      next: (data) => (this.Estudantes = data),
    });
  }

  save() {
if(this.isEditing){
  this.EstudanteService.edit(this.formGroupEstudante.value).subscribe({
next: () =>{
  this.loadEstudantes();
  this.formGroupEstudante.reset();
  this.isEditing = false;
}
  })
}
else{


    this.EstudanteService.save(this.formGroupEstudante.value).subscribe(
      {
        next: data =>{ this.Estudantes.push(data);
        this.formGroupEstudante.reset();

        }
      }
    )
  }
}

  edit(Estudante : Estudante){
this.formGroupEstudante.setValue(Estudante);
this.isEditing = true;
  }

  delete(Estudante : Estudante){
    this.EstudanteService.delete(Estudante).subscribe({

      next: () => this.loadEstudantes()
    })
  }

  clean(){
    this.formGroupEstudante.reset();
this.isEditing = false;
  }
}

