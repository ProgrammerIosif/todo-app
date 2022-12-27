/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/dataStructures.js


const item = (title, description, dueDate, priority, checked) => {
    undefined.title = title;
    undefined.description = description;
    undefined.dueDate = dueDate;
    undefined.priority = priority;
    undefined.checked = checked;
    
    return {title,description,dueDate,priority,checked};
}

const list = (priority) => {
    console.log(undefined);
    const list = [];
    undefined.priority = priority;

    const addItem = (item) => {
        if(item.priority === undefined || item.priority > list.length || item.priority < 1){
            item.priority = list.length+1;
            list.push(item);
        }
        else{
            list.splice(1, 0, item);
            for(let i = item.priority+1; i < list.length; i++){
                list[i].priority += 1;
            }
        }
        // output the new list
    }

    const removeItem = (position) => {
        list.splice(position, 1);
        // output the new list
    }

    const getList = () => {
        return list;
    }

    const getItem = (index) => {
        return list[index];
    }
    
    return {addItem, removeItem, getList, getItem};
}

const ToDoLists = (() => {
    const array = [];

    const addList = (list) => {
        if(list.priority === undefined || list.priority > list.length) {
            list.priority = array.length+1;
            array.push(list);
        }
        else{
            array.splice(1, 0, list);
            for(let i = list.priority+1; i < array.length; i++){
                array[i].priority += 1;
            }
        }
    }
    
    const removeList = (index) => {
        array.splice(index,1);
    }

    const getAllLists = () => {
        return array;
    }

    const getList = (index) => {
        return array[index];
    }

    return {addList, removeList, getAllLists, getList};
})()
;// CONCATENATED MODULE: ./src/index.js


const list1 = list(100);
list1.addItem(item("Item 1", "Description 1", "2022-12-27", 0, false));
list1.addItem(item("Item 2", "Description 2", "2022-12-27", 2, false));
list1.addItem(item("Item 3", "Description 3", "2022-12-27", 0, false));
list1.addItem(item("Item 4", "Description 4", "2022-12-27", 0, false));
list1.addItem(item("Item 5", "Description 5", "2022-12-27", 5, false));
ToDoLists.addList(list1);

const list2 = list(0);
list2.addItem(item("Item 1", "Description 1", "2022-12-27", 0, false));
list2.addItem(item("Item 2", "Description 2", "2022-12-27", 2, false));
list2.addItem(item("Item 3", "Description 3", "2022-12-27", 0, false));
list2.addItem(item("Item 4", "Description 4", "2022-12-27", 0, false));
list2.addItem(item("Item 5", "Description 5", "2022-12-27", 5, false));
ToDoLists.addList(list2);

const list3 = list(-2);
list3.addItem(item("Item 1", "Description 1", "2022-12-27", 3, false));
list3.addItem(item("Item 2", "Description 2", "2022-12-27", 0, false));
list3.addItem(item("Item 3", "Description 3", "2022-12-27", 34, false));
ToDoLists.addList(list3);

const list4 = list();
ToDoLists.addList(list4);
ToDoLists.getAllLists().forEach(x => x.getList().forEach(y => console.log(y)));
/******/ })()
;