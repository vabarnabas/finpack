import { doc, setDoc, increment } from "firebase/firestore"; 
import { v4 as uuidv4 } from 'uuid';

export const getCurrentDateTime = (time) => {
    const addZero = (number) => {
        if (number < 10) {number = "0" + number}
        return number;
    }
    const date = new Date(time ?? Date.now());
    return (date.getFullYear() + '.' + addZero(date.getMonth()) + '.' + addZero(date.getDate()) + '. ' + addZero(date.getHours()) + ':' + addZero(date.getMinutes()))
}

export const getFormattedNumber = (string) => {
    return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const getFilteredItems = (array, query) => {
    return array.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) !== -1)
}

export const onSearchQuery = (string, setString, array, setArray, setSearch) => {
    setString(string);
    setArray(getFilteredItems(array, string));
    setSearch(true);
}

export const onSearchClick = (string, setString, setSearch) => {
    setString(string);
    setSearch(false);
}

export const getStaffData = async () => {
    
}

export const writeDataToDatabase = async (database, collection, object, stateChange, setStateChange) => {
    await setDoc(doc(database, collection, uuidv4()), object);
    if (stateChange !== undefined && setStateChange !== undefined) {
        setStateChange(stateChange+1);
    }
}