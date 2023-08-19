let title=document.getElementById("title")
let price=document.getElementById("price")
let taxes=document.getElementById("taxes")
let ads=document.getElementById("ads")
let discount=document.getElementById("discount")
let small=document.getElementById("small")
let resultpro=document.getElementById("result")
let count=document.getElementById("count")
let category=document.getElementById("category")
let submit=document.getElementById("submit")
let search=document.getElementById("search")
let btntitle=document.getElementById("s-title")
let btncategory=document.getElementById("s-category")
let tbody=document.getElementById("show")
// console.log(title,price,taxes,ads,small,count,category,submit,search,btntitle,btncategory,tbody)
let temb;
let mood="create"
function total(){

    if(price.value !=""){
         let result = (Number(price.value) + +taxes.value + +ads.value)-+discount.value
        resultpro.innerHTML=result
        small.style.background="green" 
    }else{
        resultpro.innerHTML="";
        small.style.background="red" 
    }

}


let arrayproducts;
if(localStorage.getItem("product")){
  arrayproducts=JSON.parse(localStorage.getItem("product"))
}else{
  arrayproducts =[];
}

submit.onclick=function(){

let objproducts={
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    resultpro:resultpro.innerHTML,
    category:category.value.toLowerCase()
                    }
if(title.value !=""&& price.value !=''&& category.value !='' && count.value <100  ){
 
     if(mood =="create"){
    if(count.value >1 && count.value <100){
   for(let i=0; i <count.value ;i++){
    arrayproducts.push(objproducts)
   }
 }else{
      arrayproducts.push(objproducts)
                                        }

}else{
  arrayproducts[ temb ]=objproducts
  count.style.display="block"
  submit.innerHTML="create"
  mood="create"

}

cleardata()   
}
           



     localStorage.setItem("product",JSON.stringify(arrayproducts))
      
    showdata()
    total()
}


function cleardata(){
    title.value=""
    price.value=""
    taxes.value=""
    ads.value=""
    discount.value=""
    resultpro.innerHTML=""
    count.value=""
    category.value=""


}


// console.log(arrayproducts)
function showdata(){

let table='';

for (let i = 0; i < arrayproducts.length; i++) {
  table +=`
              <tr>
                    <td>${i+1}</td>
                    <td>${arrayproducts[i].title}</td>
                    <td>${arrayproducts[i].price}</td>
                    <td>${arrayproducts[i].taxes}</td>
                    <td>${arrayproducts[i].ads}</td>
                    <td>${arrayproducts[i].discount}</td>
                    <td>${arrayproducts[i].resultpro}</td>
                    <td>${arrayproducts[i].category}</td>
                    <td><button onclick="updatedata(${i})">update</button></td>
                    <td><button onclick="deletepro(${i})">delete</button></td>
                </tr> 
  
  `

}

tbody.innerHTML=table


if(arrayproducts.length >0){
  document.getElementById("deleteall").style.display="block"

}else{
  document.getElementById("deleteall").style.display="none"

}
document.getElementById("deleteall").innerHTML =`
    
delete all (${arrayproducts.length})
`

}

showdata()



function deletepro(i){

  arrayproducts.splice(i,1)
  localStorage.product =JSON.stringify(arrayproducts)
  showdata()
}



document.getElementById("deleteall").onclick=function(){

  arrayproducts.splice(0)
  localStorage.clear()
  showdata()


}


function updatedata(i){

 title.value=arrayproducts[i].title
 price.value=arrayproducts[i].price
 taxes.value=arrayproducts[i].taxes
 ads.value=arrayproducts[i].ads
 discount.value=arrayproducts[i].discount
 category.value=arrayproducts[i].category
 total()
 count.style.display="none"
 submit.innerHTML="update"
 mood="update"
 temb=i
 console.log(mood)

 scroll(
{
 top:0,
 behavior:"smooth"

}

 )
}




let searchmood="title"

search.placeholder="search by title"
function moodsearch(id){
 if(id =="s-title"){
    searchmood="title"
 search.placeholder="search by title"
 }else{
  searchmood="category"
 search.placeholder="search by category"
 }    
 

 search.focus()
 
}



function searchpro(value){
 let table=""
for(let i=0;i <arrayproducts.length;i++){
  if(searchmood =="title"){

    if(arrayproducts[i].title.includes(value.toLowerCase())){

    
      table +=`
      <tr>
            <td>${i+1}</td>
            <td>${arrayproducts[i].title}</td>
            <td>${arrayproducts[i].price}</td>
            <td>${arrayproducts[i].taxes}</td>
            <td>${arrayproducts[i].ads}</td>
            <td>${arrayproducts[i].discount}</td>
            <td>${arrayproducts[i].resultpro}</td>
            <td>${arrayproducts[i].category}</td>
            <td><button onclick="updatedata(${i})">update</button></td>
            <td><button onclick="deletepro(${i})">delete</button></td>
        </tr> 
  `
  
    }
  
  

  }else{
    if(arrayproducts[i].category.includes(value.toLowerCase())){

    
      table +=`
      <tr>
            <td>${i+1}</td>
            <td>${arrayproducts[i].title}</td>
            <td>${arrayproducts[i].price}</td>
            <td>${arrayproducts[i].taxes}</td>
            <td>${arrayproducts[i].ads}</td>
            <td>${arrayproducts[i].discount}</td>
            <td>${arrayproducts[i].resultpro}</td>
            <td>${arrayproducts[i].category}</td>
            <td><button onclick="updatedata(${i})">update</button></td>
            <td><button onclick="deletepro(${i})">delete</button></td>
        </tr> 
  `
  
    }
  }
 



 
}

tbody.innerHTML=table
}