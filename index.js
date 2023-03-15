const contacts = require('./contacts.js');
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const lists = await contacts.listContacts();
      console.table(lists);
      break;

    case "get":
      console.log(contacts.getContactById(id).then(result => console.table(result)));
      break;

    case "add":
      console.log(contacts.addContact(name, email, phone));
      break;

    case "remove":
      console.log(contacts.removeContact(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);