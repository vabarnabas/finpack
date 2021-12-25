import { doc, setDoc, increment } from "firebase/firestore"; 

export const addZero = (number) => {
    if (number < 10) {number = "0" + number}
    return number;
}

export const getCurrentDateTime = () => {
    const date = new Date(Date.now());
    return (date.getFullYear() + '.' + addZero(date.getMonth()) + '.' + addZero(date.getDate()) + '. ' + addZero(date.getHours()) + ':' + addZero(date.getMinutes()))
}

export const formatNumber = (string) => {
    return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const filterItems = (array, query) => {
    return array.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) !== -1)
}

export const onSearchQuery = (string, setString, array, setArray, setSearch) => {
    setString(string);
    setArray(filterItems(array, string));
    setSearch(true);
}

export const onSearchClick = (string, setString, setSearch) => {
    setString(string);
    setSearch(false);
}

export const getStaffData = async () => {
    
}