export default class Player {
  name: string;
  token: "X" | "O"



  constructor (name: string,token: "X" | "O") {
    this.name = name;
    this.token = token;

  }
}