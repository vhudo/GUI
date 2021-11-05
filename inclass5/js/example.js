var list = document.getElementsByTagName('ul')[0]; //get all the existing elements in the ul tag

// ADD NEW ITEM TO END OF LIST
var item = document.createElement('li'); // Create list item.
var new_item = document.createTextNode('cream'); //assign the last item name (cream) at the end of the list
item.appendChild(new_item); // Add text to list item.
list.appendChild(item);  // Add item to end of list.

// ADD NEW ITEM START OF LIST
var item = document.createElement('li');
var new_item = document.createTextNode('kale'); //assign the first item name (kale) at the end of the list
item.appendChild(new_item);
list.insertBefore(item, list.firstChild); // Add item to start of list.

// ADD A CLASS OF COOL TO ALL LIST ITEMS
var list_item = document.querySelectorAll('li');
for (var i = 0; i < list_item.length; i++){
    list_item[i].className = 'cool';
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var heading = document.querySelector('h2');
item = document.createElement('span');
count = document.createTextNode(list_item.length)
item.appendChild(count);
heading.appendChild(item);

