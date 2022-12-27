export { item, list, ToDoLists};

const item = (title, description, dueDate, priority, checked) => {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checked = checked;
    
    return {title,description,dueDate,priority,checked};
}

const list = (priority) => {
    console.log(this);
    const list = [];
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