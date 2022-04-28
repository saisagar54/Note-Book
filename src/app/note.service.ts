import { Injectable } from '@angular/core';
import {Note} from './app.note.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: Note[] =[];
  private notesUpdated = new Subject<Note[]>();

  getNotes(){
    //return [...this.notes];
    this.http.get<{message:string, notes:Note[]}>('http://localhost:3000/api/notes').subscribe((noteData)=>{
      console.log(noteData.notes);
      this.notes = noteData.notes;
      this.notesUpdated.next([...this.notes]);
    })
  }

  addPostService(title: string,subject:string, content: string){
    const note: Note ={title: title,subject: subject, content: content};
    console.log("*****************************",note);

    this.http.post('http://localhost:3000/api/notes',note).subscribe((responseData)=>{
      console.log("*****Server Responded", responseData);
      this.notes.push(note);
      this.notesUpdated.next([...this.notes]);
    });
    }
   getPostUpdateListner()
   {
     return this.notesUpdated.asObservable();
   }

  constructor(private http:HttpClient) { }
}
