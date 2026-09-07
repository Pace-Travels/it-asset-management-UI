import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { env } from '../config/env';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy {
  private socket: Socket;
  private messageSubject = new Subject<any>();

  constructor() {
    // Determine the base socket URL based on the API base URL.
    // If API_BASE_URL is http://localhost:8080/api, we just want http://localhost:8080
    const urlPattern = /^(https?:\/\/[^\/]+)/i;
    const match = env.API_BASE_URL.match(urlPattern);
    const socketUrl = match ? match[1] : env.API_BASE_URL;

    this.socket = io(socketUrl, {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });

    this.socket.on('connect', () => {
      console.log(`[SocketService] Connected with ID: ${this.socket.id}`);
    });

    this.socket.on('disconnect', () => {
      console.log('[SocketService] Disconnected');
    });

    // Listen to screen command events emitted by backend's notifyScreen
    this.socket.on('command', (data: any) => {
      console.log('[SocketService] Received command:', data);
      this.messageSubject.next(data);
    });
  }

  /**
   * Registers the current screen/session to receive specific commands.
   * Matches the backend's 'register_screen' event.
   */
  registerScreen(screenId: string): void {
    if (this.socket) {
      this.socket.emit('register_screen', screenId);
    }
  }

  /**
   * Returns an observable to listen for commands broadcasted to this socket.
   */
  getCommands(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  /**
   * Cleans up the socket connection when the service is destroyed.
   */
  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
