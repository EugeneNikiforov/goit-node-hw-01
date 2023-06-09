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

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const lists = await contacts.listContacts();
      console.table(lists);
      break;

    case "get":
      const contact = await contacts.getContactById(id)
      console.log(contact);
      break;

    case "add":
      const contactAdded = await contacts.addContact(name, email, phone);
      console.log(contactAdded);
      break;

    case "remove":
      const contactDeleted = await contacts.removeContact(id);
      console.log(contactDeleted);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);