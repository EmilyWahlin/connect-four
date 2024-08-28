export default class Player {
  name: string;
  token: "x" | "O"



  constructor (name: string,token: "x" | "O") {
    this.name = name;
    this.token = token;
    
  }
}