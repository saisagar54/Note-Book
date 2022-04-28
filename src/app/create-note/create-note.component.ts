import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NoteService } from '../note.service';
@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {
  title="";
  subject="";
  content="";

  constructor(public noteService: NoteService) { }

  addPost(form:NgForm){
    this.noteService.addPostService(form.value.title,form.value.subject, form.value.content);

  }


  ngOnInit(): void {
  }

}
