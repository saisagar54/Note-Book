import { Injectable } from '@angular/core';
import {Note} from './app.note.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: Note[] =[];
  private notesUpdated = new Subject<Note[]>();

  getNotes(){
    //return [...this.notes];
    this.http.get<{message:string, notes:any}>('http://localhost:3000/api/notes')
    .pipe(map((noteData)=>{
      return noteData.notes.map((note:any) =>{
        return {
          title: note.title,
          subject: note.subject,
          content: note.cotent,
          id: note._id
        }
      })
    }))

    .subscribe((transformedData)=>{
     console.log(transformedData);
      this.notes = transformedData;
      this.notesUpdated.next([...this.notes]);
    })
  }

  addPostService(title: string,subject:string, content: string){
    const note: Note ={id:null, title: title,subject: subject, content: content};
    console.log("*****************************",note);

    this.http.post<{message: string; noteId: string}>('http://localhost:3000/api/notes',note)
    .subscribe((responseData)=>{
      const id = responseData.noteId;
      note.id = id;
      console.log("*****Server Responded", responseData);
      this.notes.push(note);
      this.notesUpdated.next([...this.notes]);
    });
    }

    deleteNote(noteId: string | null){
      this.http.delete('http://localhost:3000/api/notes/'+noteId)
      .subscribe(()=>{
        console.log('Deleted!');
      })
    }

   getPostUpdateListner()
   {
     return this.notesUpdated.asObservable();
   }

  constructor(private http:HttpClient) { }
}
