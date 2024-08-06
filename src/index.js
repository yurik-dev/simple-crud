import { generateUUID } from './utils/helper.js';

const formEl = document.getElementById('contact-form');
const contactListContainerEl = document.getElementById(
  'contact-list-container',
);

const contacts = [];

formEl.addEventListener('submit', handleSubmit);

/**
 * @param {Event} event
 */
function handleSubmit(event) {
  event.preventDefault();

  addContact();
  renderContact();
}

/**
 * @returns {Contact}
 */
function getFormData() {
  let data = {};
  let formData = new FormData(formEl);

  formData.forEach((value, key) => {
    data['id'] = generateUUID();
    data[key] = value;
  });

  return data;
}

function addContact() {
  let contact = getFormData();
  contacts.push(contact);
}

function renderContact() {
  contactListContainerEl.textContent = '';

  contacts.forEach((contact) => createContactListElements(contact));
}

/**
 * @param {Contact[]} data
 */
function createContactListElements(data) {
  const contactListEl = document.createElement('div');
  contactListEl.id = data.id;

  const nameEl = document.createElement('p');
  nameEl.textContent = `Name: ${data.name}`;

  const ageEl = document.createElement('p');
  ageEl.textContent = `Age: ${data.age}`;

  const phoneEl = document.createElement('p');
  phoneEl.textContent = `Phone: ${data.phone}`;

  const emailEl = document.createElement('p');
  emailEl.textContent = `Email: ${data.email}`;

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    deleteContact(contactListEl.id);
  })

  contactListEl.append(nameEl, ageEl, phoneEl, emailEl, editBtn, deleteBtn);
  contactListContainerEl.append(contactListEl);
}

/**
 * @param {string} id
 */
function findContactIndex(id) {
  return contacts.findIndex((element) => element.id === id);
}

/**
 * @param {string} id
 */
function deleteContact(id) {
  const index = findContactIndex(id);
  if (index === -1) {
    throw new Error(`contact with id ${id} not found`);
  }

  contacts.splice(index, 1);
  renderContact();
}
