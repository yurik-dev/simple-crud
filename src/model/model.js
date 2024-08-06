/**
 * @type {Contact[]}
 */
export const contacts = [];

/**
 * @param {Contact[]} data
 */
export function addData(data) {
  contacts.push(data);
}

/**
 * @param {number} index
 */
export function deleteData(index) {
  contacts.splice(index, 1);
}

/**
 * @param {number} index
 * @param {Contact} editedData
 */
export function updateData(index, editedData) {
  contacts[index] = editedData;
}
