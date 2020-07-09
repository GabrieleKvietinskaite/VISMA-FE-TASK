let prepopulatedContacts = [
    {
        id: 1,
        firstName: "Vardenis",
        lastName: "Pavardenis",
        dateOfBirth: "1987-05-05",
        phoneNumber: 37064976522,
        email: "v.pavardenis@gmail.com",
        address: "Vardo g. 16"
    },
    {
        id: 2,
        firstName: "Antanas",
        lastName: "Antanaitis",
        dateOfBirth: "2001-05-29",
        phoneNumber: 37061197556,
        email: "antant@gmail.com",
        address: ""
    },
]

function listContacts(){
    let contacts = getLocalStorage();

    if(contacts !== null){
        contacts.forEach(
            contact => {
                addContactToTable(contact);
            }
        )
    }
}

function prepopulateTable(){
    let storage = getLocalStorage();

    if(storage !== null && storage.length > 0){
        alert("Table is not empty!");
    }else{
        localStorage.clear();
        addContactsToLocalStorage(prepopulatedContacts);
        window.location.reload();
    }
}

function addContactToTable(contact){
    let contactsTable = document.getElementById('contactsTable');
    let tableContent = contactsTable.innerHTML;

    tableContent += '<tr><td>' + contact.id + '</td><td>' + 
                                contact.firstName + '</td><td>' + 
                                contact.lastName + '</td><td>' + 
                                contact.dateOfBirth + '</td><td>' + 
                                contact.phoneNumber + '</td><td>' + 
                                contact.email + '</td><td>' + 
                                contact.address + '</td><td>' +
                                '<button type="button" class="updateButton" onclick="initializeUpdateContact(' + contact.id + ')">Update</button>' + 
                                '<button type="button" class="deleteButton" onclick="deleteContact(' + contact.id + ')">Delete</button></td></tr>';
    contactsTable.innerHTML = tableContent;
}

function addContactsToLocalStorage(contacts){
    let contacts_serialized = JSON.stringify(contacts);

    localStorage.setItem("Contacts", contacts_serialized);
}

function getLocalStorage(){
    return JSON.parse(localStorage.getItem("Contacts"));
}

function addContact(newContact){
    let allContacts = getLocalStorage();
    let lastContact = getLocalStorage().slice(-1).pop();
    let contact = {
        id: lastContact.id + 1,
        firstName: newContact.fname.value,
        lastName: newContact.lname.value,
        dateOfBirth: newContact.birthday.value,
        phoneNumber: newContact.phone.value,
        email: newContact.email.value,
        address: newContact.address.value
    };

    for(let i = 0; i < allContacts.length; i++){
        if(contact.phoneNumber == allContacts[i].phoneNumber || contact.email == allContacts[i].email){
            alert("Phone number and email must be unique!");
            
            return false;
        }
    }

    allContacts.push(contact);
    addContactsToLocalStorage(allContacts);
    addContactToTable(contact);
    document.getElementById("contactsForm").reset();

    return true;
}

function initializeUpdateContact(id){
    let contact = getLocalStorage().find(c => c.id == id);
    let contactIndex = getLocalStorage().findIndex(c => c.id == id);

    document.getElementById("contactsForm").setAttribute("onsubmit", "updateContact(this, " + contactIndex + "); return false");
    document.getElementById("fname").value = contact.firstName;
    document.getElementById("lname").value = contact.lastName;
    document.getElementById("birthday").value = contact.dateOfBirth;
    document.getElementById("phone").value = contact.phoneNumber;
    document.getElementById("email").value = contact.email;
    document.getElementById("address").value = contact.address;
}

function updateContact(contact, index){
    let allContacts = getLocalStorage();
    let newContact = {
        id: allContacts[index].id,
        firstName: contact.fname.value,
        lastName: contact.lname.value,
        dateOfBirth: contact.birthday.value,
        phoneNumber: contact.phone.value,
        email: contact.email.value,
        address: contact.address.value
    }; 

    for(let i = 0; i < allContacts.length; i++){
        if(newContact.id != allContacts[i].id && (newContact.phoneNumber == allContacts[i].phoneNumber || newContact.email == allContacts[i].email)){
            alert("Phone number and email must be unique!");
            
            return false;
        }
    }

    allContacts[index] = newContact;
    addContactsToLocalStorage(allContacts);
    window.location.reload();
}

function deleteContact(id){
    if (confirm("Are you sure you want to delete this contact?")) {
        let allContacts = getLocalStorage();
        let contactIndex = getLocalStorage().findIndex(c => c.id == id);
        
        allContacts.splice(contactIndex, 1);
        addContactsToLocalStorage(allContacts);
        window.location.reload();
    }
}

listContacts();