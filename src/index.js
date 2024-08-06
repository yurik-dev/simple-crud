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
}

/**
 * @returns {Contact}
 */
function getFormData() {
  let data = {};
  let formData = new FormData(formEl);

  formData.forEach((key, value) => {
    data['id'] = generateUUID();
    data[key] = value;
  });

  return data;
}

function addContact() {
  let contact = getFormData();
  contacts.push(contact);

  console.log(contacts);
}
