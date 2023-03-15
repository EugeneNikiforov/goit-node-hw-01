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
        const contact = await new Promise((resolve, reject) => {
            fs.unlink(contactsPath, (err) => {
                if (err) {
                    reject(err);
                    return;
                } else if (contactId === id) {
                    console.log("File deleted successfully!");
                    resolve();
                }
                else {
                    console.log(`${contact} not found (-_-)`);
                }
            });
        });
        } catch (error) {
        console.error(error.message);
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