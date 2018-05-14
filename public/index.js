//Global 
let shoppingList = [];
let editItemClick = false;
let expeditIndex;
const $p = document.getElementById('gTotal');
const $heading = document.getElementById('heading');

function renderList(data){
  
  shoppingList = data;
  
  const $shoppingItem = document.getElementById('shoppingItems');
  $shoppingItem.innerHTML = "";
  $p.innerHTML = "";
  $heading.innerHTML = "";
    data.forEach((item, index) => {
    
    const $li = document.createElement('li');
    

    const $removeBtn = document.createElement('button');
    $removeBtn.setAttribute('type', 'button');
    $removeBtn.setAttribute('onclick', 'removeItem(event)');
    $removeBtn.setAttribute('id', '$removeBtn');
    $removeBtn.setAttribute('class', 'delete');
    $removeBtn.setAttribute('dataIndex', item.id);
    $removeBtn.innerHTML = 'Remove Item';

    //edit button
    const $editBtn = document.createElement('button');
    $editBtn.setAttribute('type', 'button');
    $editBtn.setAttribute('onclick', 'editItem(event)');
    $editBtn.setAttribute('class', 'edit');
    //removeBtn.setAttribute('name', 'removeBtn');
    
    $editBtn.setAttribute('editIndex', item.id);
    $editBtn.innerHTML = 'Edit';
    
    
    $li.innerHTML = `Id: ${item.id} Name:${item.name} Email:${item.email} Phone:${item.phone}`;
    $li.appendChild($removeBtn);
    $li.appendChild($editBtn);
    $shoppingItem.appendChild($li);
    //renderTotal(data);
  });
  
} 


/**
 * @description calculate total products (amount * price ) 
 * @param {response.data} data 
 */
/* function renderTotal(data){

let gTotal = data.map((item) => parseInt(item.amount) * parseInt(item.price)).reduce( (a , b ) => a + b );
  $p.innerHTML = 'Grand Total:' + gTotal;

} */


window.removeItem = ( (event) => {
   
  const index1 = event.target.getAttribute('dataIndex')
   axios.delete('/shopping_list/'+index1)

  .then(function(response){
    //renderList(response.data);
//add new
    axios.get('/shopping_list')
    .then(function (response) {
      renderList(response.data)
   })
    .catch(function (error) {
      console.log(error);
    });
  //********************************************** */
    $heading.innerHTML = `Item has been deleted: ${response.data}`;
    if(response.data.length === 0){
      $heading.innerHTML = `There is no item in Shopping List`;
    }
     
  }).catch(function(err){
    console.log(err);
  });
})




window.editItem = ( (event) => {
   const editIndex = event.target.getAttribute('editIndex');
   expeditIndex = editIndex;
     //shoppingList.forEach((item, index) =>{
      document.getElementById('tid').value = editIndex;
       //document.getElementById('name').value = shoppingList[expeditIndex].name;
      /*document.getElementById('email').value = item.email;
      document.getElementById('phone').value = item.phone; */
      document.getElementById('submit').innerHTML = 'Edit Item';
      
       
    //})
    
    editItemClick = true;
  
})

document.getElementById('form2').addEventListener('submit', (event) => {
  event.preventDefault();
  const $item = {
    tid:   document.getElementById('tid').value,
    name:  document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
  }

if(editItemClick){
  
  axios.patch('/shopping_list/'+expeditIndex, $item)
  
  .then(function(response){
   renderList(response.data);
   document.getElementById('submit').innerHTML = 'Add Item';
   $heading.innerHTML = `${$item.name}has been edited`;
    

   editItemClick =  false;
    
  }).catch(function(err){
    console.log(err);
  });

}else{

  axios.post('/shopping_list',$item)
     .then(function (response) {
       
      renderList(response.data);
      $heading.innerHTML = `${$item.name} has been added`;
    
    }).catch(function (error) {
      console.log(error);
    });
  }
   //console.log('Post Data'+ $item);
   document.getElementById('tid').value = "";
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('phone').value =  "";
    
})


axios.get('/shopping_list')
  .then(function (response) {
    renderList(response.data)
 })
  .catch(function (error) {
    console.log(error);
  });


  