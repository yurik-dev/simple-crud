import { addData, contacts, deleteData, updateData } from './model/model.js';
import {
  loadDataFromLocalStorage,
  saveDataToLocalStorage,
} from './model/storage.js';
import { generateUUID } from './utils/helper.js';

const formEl = document.getElementById('contact-form');
const contactListContainerEl = document.getElementById(
  'contact-list-container',
);
const searchFormEl = document.getElementById('search-form');

document.addEventListener('DOMContentLoaded', init)

function init() {
  loadDataFromLocalStorage();
  renderContact(contacts);

  formEl.addEventListener('submit', handleSubmit);
  searchFormEl.addEventListener('input', handleSearch);
}

/**
 * @param {Event} event
 */
function handleSubmit(event) {
  event.preventDefault();

  addContact();
  renderContact(contacts);
  saveDataToLocalStorage(contacts);

  event.target.reset()
}

/**
 * @param {Event} event
 */
function handleSearch(event) {
  event.preventDefault();

  const query = event.target.value;

  searchContact(contacts, query);
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
  let newContact = getFormData();

  addData(newContact);
}

function renderContact(data) {
  contactListContainerEl.textContent = '';

  data.forEach((contact) => createContactListElements(data, contact));
}

/**
 * @param {Contact[]} source - point to model data
 * @param {Contact} contact
 */
function createContactListElements(data, contact) {
  const contactListEl = document.createElement('div');
  contactListEl.id = contact.id;

  const nameEl = document.createElement('p');
  nameEl.textContent = `Name: ${contact.name}`;

  const ageEl = document.createElement('p');
  ageEl.textContent = `Age: ${contact.age}`;

  const phoneEl = document.createElement('p');
  phoneEl.textContent = `Phone: ${contact.phone}`;

  const emailEl = document.createElement('p');
  emailEl.textContent = `Email: ${contact.email}`;

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', () => {
    const editedContact = getFormData();
    updateContact(data, contactListEl.id, editedContact);
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    deleteContact(data, contactListEl.id);
  });

  contactListEl.append(nameEl, ageEl, phoneEl, emailEl, editBtn, deleteBtn);
  contactListContainerEl.append(contactListEl);
}

/**
 * @param {Contact[]} data
 * @param {string} id
 * @returns {number}
 */
function findContactIndex(data, id) {
  return data.findIndex((element) => element.id === id);
}

/**
 * @param {Contact[]} data
 * @param {string} id
 */
function deleteContact(data, id) {
  const index = findContactIndex(data, id);
  if (index === -1) {
    throw new Error(`contact with id ${id} not found`);
  }

  deleteData(index);
  saveDataToLocalStorage(data)
  renderContact(data);
}

/**
 * @param {Contact[]} data
 * @param {string} id
 * @param {Contact} edited
 */
function updateContact(data, id, editedContact) {
  const index = findContactIndex(data, id);
  if (index === -1) {
    throw new Error(`contact with id ${id} not found`);
  }

  updateData(index, editedContact);
  saveDataToLocalStorage(data)
  renderContact(data);
}

/**
 * @param {Contact[]} data
 * @param {string} keyword
 */
function searchContact(data, keyword) {
  const filtered = data.filter((contact) => {
    return Object.values(contact).some((value) =>
      value.toString().toLowerCase().includes(keyword.toLowerCase()),
    );
  });

  renderContact(filtered);
}
