import { Injectable } from '@angular/core';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';
import { ProfileUser } from '../models/user';
import { AuthService } from './auth.service';
import { doc,docData,Firestore,getDoc,setDoc,updateDoc,deleteDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root',
})

export class UsersService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  get currentUserProfile$(): Observable<ProfileUser | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }

  addUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(setDoc(ref, user));
  }

  updateUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(ref, { ...user }));
  }
  deleteUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(deleteDoc(ref));
  }
}