const inquirer = require('inquirer');
const consola = require('consola');

enum Action {
  List = "list",
  Add = "add",
  Remove = "remove",
  Quit = "quit"
}

type InquirerAnswers = {
  action: Action
}

const startApp = () => {
  inquirer.prompt([{
    name: 'action',
    type: 'input',
    message: 'How can I help you?',
  }]).then((answers: InquirerAnswers) => {
    console.log("Chosen action: " + answers.action);
    startApp();
    if (answers.action === "quit")
      return;
  });
}

enum MessageVariant {
  Success = "success",
  Error = "error",
  Info = "info",
}

class Message {
  #content: string;

  constructor(content: string) {
    this.#content = content;
  }

  public show(): void {
    console.log(this.#content);
  }

  public capitalize(): void {
    this.#content = this.#content.charAt(0).toUpperCase() + this.#content.slice(1).toLowerCase();
  }

  public toUpperCase(): void {
    this.#content = this.#content.toUpperCase();
  }

  public toLowerCase(): void {
    this.#content = this.#content.toLowerCase();
  }

  public static showColorized(variant: MessageVariant, text: string): void {
    switch(variant) {
      case MessageVariant.Success:
        consola.success(text);
        break;
      case MessageVariant.Error:
        consola.error(`x ${text}`);
        break;
      case MessageVariant.Info:
        consola.info(`ℹ ${text}`);
        break;
      default:
        break;
    }
  }
}

// const msg = new Message("heLlo world!");
// msg.show(); // "heLlo world!"
// msg.capitalize();
// msg.show(); // "Hello world!"
// msg.toLowerCase();
// msg.show(); // "hello world!"
// msg.toUpperCase();
// msg.show(); // "HELLO WORLD!"
// Message.showColorized(MessageVariant.Success, "Test"); // √ "Test"
// Message.showColorized(MessageVariant.Error, "Test 2"); // "x Test 2"
// Message.showColorized(MessageVariant.Info, "Test 3"); // ℹ "Test 3"

interface User {
  name: string;
  age: number;
}

class UsersData {
  public data: User[] = [];

  public showAll(): void {
    if (this.data.length > 0) {
      Message.showColorized(MessageVariant.Info, "Users data");
      console.table(this.data);
    } else {
      Message.showColorized(MessageVariant.Info, "No data...");
    }
  }

  public add(user: User): void {
    if (user.age > 0 && user.name.length > 0) {
      this.data.push(user);
      Message.showColorized(MessageVariant.Success, "User has been successfully added!");
    } else {
      Message.showColorized(MessageVariant.Error, "Wrong data!");
    }
  }

  public remove(name: string): void {
    const userIndex = this.data.findIndex(user => user.name === name);
    if (userIndex !== -1) {
      this.data.splice(userIndex, 1);
      Message.showColorized(MessageVariant.Success, "User deleted!");
    } else {
      Message.showColorized(MessageVariant.Error, "User not found");
    }
  }
}

const users = new UsersData();
users.showAll();
users.add({ name: "Jan", age: 20 });
users.add({ name: "Adam", age: 30 });
users.add({ name: "Kasia", age: 23 });
users.add({ name: "Basia", age: -6 });
users.showAll();
users.remove("Maurycy");
users.remove("Adam");
users.showAll();

startApp();