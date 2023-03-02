let shopping = document.getElementById("shopping");

let shopItemsData = [{
  id: "kfjdkfjd",
  name: "Casual Shirt",
  price: 45,
  desc: "Lorem ipsum dolor sit amet consectetur adipisicing. ",
  img: "images/img-1.jpg"
},

{
  id: "ijijiihi",
  name: "Office Shirt",
  price: 100,
  desc: "Lorem ipsum dolor sit amet consectetur adipisicing. ",
  img: "images/img-2.jpg"
},

{
  id: "sfsfwewf",
  name: "T Shirt",
  price: 25,
  desc: "Lorem ipsum dolor sit amet consectetur adipisicing. ",
  img: "images/img-3.jpg"
},

{
  id: "feofjeo",
  name: "Men Suit",
  price: 300,
  desc: "Lorem ipsum dolor sit amet consectetur adipisicing. ",
  img: "images/img-4.jpg"
}]



let basket = JSON.parse(localStorage.getItem("data")) || []


let generateShop = () => {
  return (shopping.innerHTML = shopItemsData.map((x) => {
    let { id, name, price, desc, img } = x
    let search = basket.find((x) => x.id === id) || []
    return `  
    <div id = product-id ${id} class="shopping-box">
    <div class="images">
      <img width=100% src= ${img} alt="image-1">
    </div>
    <div class="detail">
      <h3>${name}</h3>
      <p class="detail-info">
        ${desc}.
      </p>
      <div class="price-quantity">
        <div class="price">
          $ ${price}
        </div>
        <div class="quantity">
          <i onclick = "decrement(${id})" class="bi bi-dash"></i>
          <div id = ${id} class="class">
            ${search.item === undefined ? 0 : search.item}          
          </div>
          <i onclick = "increment(${id})" class="bi bi-plus"></i>
        </div>
      </div>
    </div>
  </div>`
  }).join(""))
}

generateShop()


let increment = (id) => {
  let selectedItem = id
  let search = basket.find((x) => x.id === selectedItem.id)

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1
    })
  }
  else {
    search.item += 1
  }

  localStorage.setItem("data", JSON.stringify(basket))


  // console.log(basket)
  update(selectedItem.id)
}

let decrement = (id) => {
  let selectedItem = id
  let search = basket.find((x) => x.id === selectedItem.id)

  if (search === undefined) return
  else if (search.item === 0) return
  else {
    search.item -= 1
  }
  update(selectedItem.id)
  basket = basket.filter((x) => x.item !== 0)


  // console.log(basket)
  localStorage.setItem("data", JSON.stringify(basket))
}

let update = (id) => {
  let search = basket.find((x) => x.id === id)
  // console.log(search.item)
  document.getElementById(id).innerHTML = search.item
  caculation()
}

let caculation = () => {
  let cartIcon = document.getElementById("cartAccount")
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
}

caculation()