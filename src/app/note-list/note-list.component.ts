import { Component, OnDestroy, OnInit } from '@angular/core';
import {Note} from '../app.note.model';
import { NoteService } from '../note.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit, OnDestroy {
  Notes:Note[] =[];
  private notesSub: Subscription | undefined;

  panelOpenState = false;
  constructor(public noteService:NoteService) { }

  ngOnInit(): void {
    this.noteService.getNotes();
    console.log("inside list", this.Notes);
    this.notesSub =this.noteService.getPostUpdateListner().subscribe((Notes:Note [])=>{
      this.Notes = Notes;
    });
  }
  ngOnDestroy(): void {
    this.notesSub?.unsubscribe();
  }

}
