const fs = require('fs').promises;
// const nanoid = require('nanoid');
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
    try {
        const list = await fs.readFile(contactsPath, "utf8");
        const listJson = JSON.parse(list);
        return listJson;
    } catch (err) {
        console.error(err.message);
    }
}

async function getContactById(contactId) {
    try {
        const list = await listContacts();
        const contact = String(contactId);
        const contactFound = list.find((contactFound) => (contactFound.id === contact));
        return contactFound;
    } catch (err) {
        console.error(err.message);
    }
}

async function removeContact(contactId) {
    try {
        const list = await listContacts();
        const contact = String(contactId);
        const index = list.findIndex((contactFound) => (contactFound.id === contact));
        list.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
        // console.log("Contact has been deleted *.*");
        return `Contact with id=${contact} has been deleted *.*`;
        } catch (err) {
        console.error(err.message);
    }
}

async function addContact(name, email, phone) {
    try {
        await new Promise((resolve, reject) => {
            fs.readFile(contactsPath, "utf-8", (err, list) => {
                if (err) console.log(err.message);
                const contacts = JSON.parse(list)
                const contactNew = { id: shortid.generate(), name, email, phone }
                const contactsList = JSON.stringify([contactNew, ...contacts], null, '\t')
        
                fs.writeFile(contactsPath, contactsList, (err) => {
                    if (err) reject(err);
                    else {
                        console.log("File has been written.");
                        resolve();
                    }
                })
            });
        });
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}