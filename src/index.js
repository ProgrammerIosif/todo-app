import { item,list,ToDoLists } from "./dataStructures";

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