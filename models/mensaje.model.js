import { v4 as uuidv4 } from 'uuid'

export class Message {
  static id = uuidv4()
  constructor (autor, mensaje) {
    this.id = Message.id
    this.autor = autor
    this.mensaje = mensaje
  }
}
