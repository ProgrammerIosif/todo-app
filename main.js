/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
var __webpack_unused_export__;

// DATA STRUCTURING

const item = (title, description, dueDate, priority, checked) => {
    __webpack_unused_export__ = title;
    __webpack_unused_export__ = description;
    __webpack_unused_export__ = dueDate;
    __webpack_unused_export__ = priority;
    __webpack_unused_export__ = checked;
    
    return {title,description,dueDate,priority,checked};
}

const list = (title, priority) => {
    const list = [];
    __webpack_unused_export__ = title;
    __webpack_unused_export__ = priority;

    const addItem = (item) => {
        if(item.priority === undefined || item.priority > list.length || item.priority < 1){
            item.priority = list.length+1;
            list.push(item);
        }
        else{
            list.splice(item.priority-1, 0, item);
            for(let i = item.priority; i < list.length; i++){
                list[i].priority += 1;
            }
        }
    }

    const removeItem = (index) => {
        list.splice(index, 1);
        for(let i = index; i < list.length; i++){
            list[i].priority -= 1;
        }
    }

    const getAllItems = () => {
        return list;
    }

    const getItem = (index) => {
        return list[index];
    }

    const switchItems = (index1, index2) => {
        console.log(index1,index2)
        const item2 = list[index2];
        list[index2] = list[index1];
        list[index1] = item2; 
        list[index1].priority--;
        list[index2].priority++;
    }

    const getLength = () => list.length;
    
    return {title, priority, getLength, addItem, removeItem, getAllItems, getItem, switchItems};
}

const ToDo = (() => {
    const array = [];
    let focusedList = -1;
    let focusedItem = -1;

    const addList = (list) => {
        if(list.priority === undefined || list.priority > array.length || list.priority < 1) {
            list.priority = array.length+1;
            array.push(list);
        }
        else{
            array.splice(list.priority-1, 0, list);
            for(let i = list.priority; i < array.length; i++){
                array[i].priority += 1;
            }
        }
        ToDo.focusedList = list.priority-1;
    }
    
    const removeList = (index) => {
        array.splice(index,1);
        for(let i = index; i < array.length; i++){
            array[i].priority -= 1;
        }
        if(ToDo.focusedList == index){
            ToDo.focusedList = -1;
        }
        else if(ToDo.focusedList > index){
            ToDo.focusedList--;
        }   
    }

    const getAllLists = () => {
        return array;
    }

    const getList = (index) => {
        return array[index];
    }

    const switchLists = (index1, index2) => {
        const list2 = array[index2];
        array[index2] = array[index1];
        array[index1] = list2; 
        array[index1].priority--;
        array[index2].priority++;
    }

    return {addList, removeList, getAllLists, getList, focusedList, focusedItem, switchLists};
})();


function interfaceBuilder() {
    const buildListElement = (list) => {
        const newList = document.createElement("div");
        newList.id = list.priority-1;
        newList.classList.add("list");

        const listTitle = document.createElement("button");
        listTitle.textContent = list.title;
        listTitle.classList.add("list-title");
        newList.appendChild(listTitle);
        listTitle.addEventListener("click", () => {
                ToDo.focusedItem = -1;
                ToDo.focusedList = newList.id; 
                interfaceBuilder();
                return;
            });
            
        const listMoveUp = document.createElement("button");
        listMoveUp.textContent = "<";
        listMoveUp.addEventListener("click", () => {
                if(newList.id > 0){
                    ToDo.switchLists(newList.id-1,newList.id);
                    ToDo.focusedList = -1;
                    ToDo.focusedItem = -1;
                    interfaceBuilder();
                    return;
                }
            });
        newList.appendChild(listMoveUp);

        const listMoveDown = document.createElement("button");
        listMoveDown.textContent = ">";
        listMoveDown.addEventListener("click", () => {
                if(newList.id < ToDo.getAllLists().length-1){
                    ToDo.switchLists(newList.id,parseInt(newList.id)+1);
                    ToDo.focusedList = -1;
                    ToDo.focusedItem = -1;
                    interfaceBuilder();
                    return;
                }
            });
        newList.appendChild(listMoveDown);

        const listRemove = document.createElement("button");
        listRemove.textContent = "X";
        newList.appendChild(listRemove);
        listRemove.addEventListener("click", () => {
                ToDo.removeList(newList.id);
                interfaceBuilder();
                return;
            });
        
        return newList;
    }

    const buildItemElement = (item) => {
        const newItem = document.createElement("li"); 
        newItem.id = item.priority-1;
        newItem.classList.add("item");
        
        const itemTitle = document.createElement("div");
        itemTitle.textContent = item.title;
        itemTitle.classList.add("item-title");
        newItem.appendChild(itemTitle);
        
        const itemDetails = document.createElement("button");
        itemDetails.textContent = "Details";
        itemDetails.classList.add("item-details");
        itemDetails.addEventListener("click", () => {
                ToDo.focusedItem = newItem.id;
                interfaceBuilder();
                return;
            });
        newItem.appendChild(itemDetails); 

        const itemMoveUp = document.createElement("button");
        itemMoveUp.textContent = "<";
        itemMoveUp.addEventListener("click", () => {
                if(newItem.id > 0){
                    ToDo.getList(ToDo.focusedList).switchItems(newItem.id-1,newItem.id);
                    interfaceBuilder();
                    return;
                }
            });
        newItem.appendChild(itemMoveUp);

        const itemMoveDown = document.createElement("button");
        itemMoveDown.textContent = ">";
        itemMoveDown.addEventListener("click", () => {
                if(newItem.id < ToDo.getList(ToDo.focusedList).getLength()-1){
                    ToDo.getList(ToDo.focusedList).switchItems(newItem.id,parseInt(newItem.id)+1);
                    interfaceBuilder();
                    return;
                }
            });
        newItem.appendChild(itemMoveDown);

        const itemRemove = document.createElement("button");
        itemRemove.textContent = "X";
        newItem.appendChild(itemRemove);
        itemRemove.addEventListener("click", () => {
                ToDo.getList(ToDo.focusedList).removeItem(newItem.id);
                interfaceBuilder();
                return;
            });

        return newItem;
    }

    const buildHeader = () => {
        const header = document.createElement("div");
        header.id = "header";
        header.textContent = "TO-DO"
        return header;
    }

    const buildNewListButton = () => {
        const newListButton = document.createElement("button");
        newListButton.id = "newListButton";
        newListButton.textContent = "+ New List";
        newListButton.addEventListener("click", () => {
                listsContainer.removeChild(newListButton); 
                const newListForm = document.createElement("form");
                newListForm.addEventListener("submit", (e) => {
                        e.preventDefault();
                        ToDo.addList(list(newListName.value,
                                          parseInt(newListPriority.value)));
                        interfaceBuilder();
                        return;
                    });
                const newListName = document.createElement("input");
                newListName.type = "text";
                newListName.placeholder = "Name";
                newListName.required = true;
                newListName.maxLength = 20;
                newListForm.appendChild(newListName);
                const newListPriority = document.createElement("input");
                newListPriority.type = "number";
                newListPriority.placeholder = "Priority";
                newListPriority.value = ToDo.getAllLists().length+1;
                newListPriority.min = 1;
                newListPriority.max = ToDo.getAllLists().length+1;
                newListPriority.required = true;
                newListForm.appendChild(newListPriority);
                const newListAdd = document.createElement("input");
                newListAdd.type = "submit";
                newListAdd.value = "Add List";
                newListAdd.textContent = "Add";
                newListForm.appendChild(newListAdd);

                listsContainer.appendChild(newListForm);
            });
        
        return newListButton;
    }

    const buildListsContainer = () => {
        const listsContainer = document.createElement("ul");
        listsContainer.id = "lists-container";
        ToDo.getAllLists().forEach(list => {
                listsContainer.appendChild(buildListElement(list));
            })
        const newListButton = buildNewListButton();
        listsContainer.appendChild(newListButton);

        return listsContainer;
    }

    const buildNewItemButton = () => {
        const newItemButton = document.createElement("button");
        newItemButton.id = "newItemButton";
        newItemButton.textContent = "New Item";
        newItemButton.addEventListener("click", () => {
                focusedList.removeChild(newItemButton); 
                const newItemForm = document.createElement("form");
                newItemForm.addEventListener("submit", (e) => {
                        e.preventDefault();
                        ToDo.getList(ToDo.focusedList).addItem(item(newItemTitle.value,
                                                                    newItemDescription.value,
                                                                    newItemDueDate.value,
                                                                    parseInt(newItemPriority.value),
                                                                    false));
                        interfaceBuilder();
                        return;
                    });
                    //description, duedate, checked
                const newItemTitle = document.createElement("input");
                newItemTitle.type = "text";
                newItemTitle.required = true;
                newItemTitle.maxLength = 20;
                newItemTitle.placeholder = "title";
                newItemForm.appendChild(newItemTitle);
                const newItemDescription = document.createElement("textarea");
                newItemDescription.maxLength = 100;
                newItemDescription.placeholder = "description";
                newItemForm.appendChild(newItemDescription);
                const newItemPriority = document.createElement("input");
                newItemPriority.type = "number";
                newItemPriority.value = ToDo.getList(ToDo.focusedList).getLength()+1;
                newItemPriority.placeholder = "priority";
                newItemPriority.min = 1;
                newItemPriority.max = ToDo.getList(ToDo.focusedList).getLength()+1;
                newItemForm.appendChild(newItemPriority);
                const newItemDueDate = document.createElement("input");
                newItemDueDate.type = "date";
                newItemForm.appendChild(newItemDueDate);
                // const item = (title, description, dueDate, priority, checked) => {
                const newItemAdd = document.createElement("input");
                newItemAdd.type = "submit";
                newItemAdd.textContent = "Add";
                newItemForm.appendChild(newItemAdd);

                focusedList.appendChild(newItemForm);
            });
        
        return newItemButton;
        
    }

    const buildFocusedList = () => {
        const focusedList = document.createElement("div");
        focusedList.id = "focused-list";
        if(ToDo.focusedList != -1){
            const list = ToDo.getList(ToDo.focusedList);
            const listTitle = document.createElement("div");
            listTitle.textContent = list.title;
            listTitle.id = 'focused-list-title';
            focusedList.appendChild(listTitle);
            const itemsContainer = document.createElement("ul");
            itemsContainer.id = "items-container";
            list.getAllItems().forEach(item => {
                    itemsContainer.appendChild(buildItemElement(item));
                })
            focusedList.appendChild(itemsContainer);
            const newItemButton = buildNewItemButton();
            focusedList.appendChild(newItemButton);
        }
        return focusedList;
    }

    const buildFocusedItem = () => {
        const focusedItem = document.createElement("div");
        focusedItem.id = "focused-item";
        if(ToDo.focusedItem != -1){
            const item = ToDo.getList(ToDo.focusedList).getItem(ToDo.focusedItem);
            const title = document.createElement("div");
            title.textContent = item.title;
            focusedItem.appendChild(title);
            const description = document.createElement("div");
            description.textContent = item.description;
            focusedItem.appendChild(description);
            const dueDate = document.createElement("div");
            dueDate.textContent = item.dueDate;
            focusedItem.appendChild(dueDate);
            const priority = document.createElement("div");
            priority.textContent = item.priority
            focusedItem.appendChild(priority);
            const checked = document.createElement("div");
            checked.textContent = item.checked
            focusedItem.appendChild(checked);
        }

        return focusedItem;
    }

    // container>header
    //          >dock>listsContainer
    //          >main>focusedList
    //               >focusedItem

    const container = document.querySelector("#container");
    container.innerHTML = "";

    const header = buildHeader();
    const listsContainer = buildListsContainer();
    const focusedList = buildFocusedList();
    const focusedItem = buildFocusedItem();

    const dockTitle = document.createElement('div');
    dockTitle.id = "dock-title";
    dockTitle.textContent = "LISTS";
    const dock = document.createElement("div");
    dock.id = "dock";
    dock.appendChild(dockTitle);
    dock.appendChild(listsContainer);

    const main = document.createElement("div");
    main.id = "main";
    main.appendChild(focusedList);
    main.appendChild(focusedItem);

    container.appendChild(header);
    container.appendChild(dock);
    container.appendChild(main);
}


const list1 = list('list1',1);
list1.addItem(item("Item 1", "Description 1", "2022-12-27", 9, false));
list1.addItem(item("Item 2", "Description 2", "2022-12-27", 2, false));
list1.addItem(item("Item 3", "Description 3", "2022-12-27", 0, false));
list1.addItem(item("Item 4", "Description 4", "2022-12-27", 0, false));
ToDo.addList(list1);

const list2 = list('lisw2',2);
list2.addItem(item("Item 1", "Description 1afsdddddddddddddddddddddddddddddddddddddddddddddddddd dddddddddddddddddddddddddddddddd ddddddddddddddddddddddddddddddddd dddddddddddddddddddddddddddddddddddddddddddddddddddddddd dddddddddddddddddddd", "2022-12-27", 0, false));
list2.addItem(item("Item 2", "Description 2", "2022-12-27", 2, false));
list2.addItem(item("Item 3", "Description 3", "2022-12-27", 0, false));
list2.addItem(item("Item 4", "Description 4", "2022-12-27", 0, false));
list2.addItem(item("Item 5", "Description 5", "2022-12-27", 5, false));
ToDo.addList(list2);

const list3 = list('list3',3);
list3.addItem(item("Item 1", "Description 1", "2022-12-27", 3, false));
list3.addItem(item("Item 2", "Description 2", "2022-12-27", 0, false));
list3.addItem(item("Item 3", "Description 3", "2022-12-27", 34, false));
ToDo.addList(list3);

const list4 = list('list4',4);
ToDo.addList(list4);

ToDo.focusedList = 1;
interfaceBuilder();
/******/ })()
;