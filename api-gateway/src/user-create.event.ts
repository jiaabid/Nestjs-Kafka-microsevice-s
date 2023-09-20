export class UserCreatedEvent {
    constructor(
      public readonly email: string,
      public readonly password: string,
      public readonly name: string,
    ) {}
  
    toString() {
      return JSON.stringify({
        email: this.email,
        password: this.password,
        name: this.name,
      });
    }
  }
  