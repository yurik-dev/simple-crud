import { addData } from './model.js';

const STORAGE_KEY = 'CONTACT_DATA'

export function loadDataFromLocalStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  const deserializedData = JSON.parse(serializedData)

  if (deserializedData) {
    for (const data of deserializedData) {
      addData(data)
    }
  }
}

/**
 * @param {Contact[]} data
 */
export function saveDataToLocalStorage(data) {
  const serializedData = JSON.stringify(data)

  localStorage.setItem(STORAGE_KEY, serializedData)
}