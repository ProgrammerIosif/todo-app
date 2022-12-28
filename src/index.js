
// DATA STRUCTURING

const item = (title, description, dueDate, priority, checked) => {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checked = checked;
    
    return {title,description,dueDate,priority,checked};
}

const list = (title, priority) => {
    const list = [];
    this.title = title;
    this.priority = priority;

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

    const getAllItems = () => {
        return list;
    }

    const getItem = (index) => {
        return list[index];
    }
    
    return {title, priority, addItem, removeItem, getAllItems, getItem};
}

const ToDo = (() => {
    const array = [];
    let focusedList = -1;

    const addList = (list) => {
        if(list.priority === undefined || list.priority > array.length || list.priority < 1) {
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

    return {addList, removeList, getAllLists, getList, focusedList};
})();


function interfaceBuilder() {
    const container = document.querySelector("#container");
    container.innerHTML = "";

    const header = document.createElement("div");
    header.id = "header";
    header.textContent = "TO-DO"

    const content = document.createElement("div");
    content.id = "content";

    const dock = document.createElement("div");
    dock.id = "dock";

    const listsContainer = document.createElement("ul");
    listsContainer.id = "lists-container";
    ToDo.getAllLists().forEach(list => {
            const newList = document.createElement("button");
            newList.classList.add("list-title");
            newList.id = list.priority-1;
            newList.textContent = list.title;
            newList.addEventListener("click", () => {
                    ToDo.focusedList = newList.id; 
                    console.log(ToDo.focusedList);
                    interfaceBuilder();
                    return;
                });
            listsContainer.appendChild(newList);
        })
    dock.appendChild(listsContainer);



    const main = document.createElement("div");
    main.id = "main";

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
                const newItem = document.createElement("li"); 
                newItem.id = item.priority-1;
                newItem.textContent = item.title;
                itemsContainer.appendChild(newItem);
            })
        focusedList.appendChild(itemsContainer);
    }

    const expandedItem = document.createElement("div");
    expandedItem.id = "focused-item";
    expandedItem.innerHTML = "TO-DO";

    main.appendChild(focusedList);
    main.appendChild(expandedItem);

    content.appendChild(dock);
    content.appendChild(main);

    container.appendChild(header);
    container.appendChild(content);
}


const list1 = list('list23',100);
list1.addItem(item("Item 1", "Description 1", "2022-12-27", -4, false));
list1.addItem(item("Item 2", "Description 2", "2022-12-27", 2, false));
list1.addItem(item("Item 3", "Description 3", "2022-12-27", 0, false));
list1.addItem(item("Item 4", "Description 4", "2022-12-27", 0, false));
list1.addItem(item("Item 5", "Description 5", "2022-12-27", 5, false));
ToDo.addList(list1);

const list2 = list('lisw5234',0);
list2.addItem(item("Item 1", "Description 1", "2022-12-27", 0, false));
list2.addItem(item("Item 2", "Description 2", "2022-12-27", 2, false));
list2.addItem(item("Item 3", "Description 3", "2022-12-27", 0, false));
list2.addItem(item("Item 4", "Description 4", "2022-12-27", 0, false));
list2.addItem(item("Item 5", "Description 5", "2022-12-27", 5, false));
ToDo.addList(list2);

const list3 = list('fsdf',-2);
list3.addItem(item("Item 1", "Description 1", "2022-12-27", 3, false));
list3.addItem(item("Item 2", "Description 2", "2022-12-27", 0, false));
list3.addItem(item("Item 3", "Description 3", "2022-12-27", 34, false));
ToDo.addList(list3);

const list4 = list('fsdf');
ToDo.addList(list4);

interfaceBuilder();