let label = document.getElementById("label")
let shoppingcart = document.getElementById("shopping-cart")

let basket1 = JSON.parse(localStorage.getItem("data")) || []



let caculation1 = () => {
  let cartIcon = document.getElementById("cartAccount")
  cartIcon.innerHTML = basket1.map((x) => x.item).reduce((x, y) => x + y, 0)
}

caculation1()

let generateCartItems = () => {
  if (basket1.length !== 0) {
    return (shoppingcart.innerHTML = basket1.map((x) => {
      console.log(x)
      let { id, item } = x
      let search = shopItemsData.find((y) => y.id === id) || []
      return `
          <div class = "cart-item">
            <img width= "100" src = ${search.img} alt ="">
            <div class = "detail">
              <div class ="title-price-x">
                <h4 class ="title-price">
                  <p>${search.name}</p>
                  <p class = "price"> $${search.price}</p> 
                </h4>
                  <i onclick = "removeItems(${id})" class="bi bi-x-lg"></i>
              </div>

              <div class = "cart-button">
                <i onclick = "decrement1(${id})" class="bi bi-dash"></i>
                <div id = ${id} class="class">
                  ${item}          
                </div>
                <i onclick = "increment1(${id})" class="bi bi-plus"></i>
              </div>

              <h3>
              $${item * search.price}
              </h3>
            </div>
          </div>`
    }).join(""));
  } else {
    shoppingcart.innerHTML = ``
    label.innerHTML = `
    <h2>Cart is empty </h2>
    <a href="index.html">a
      <button class = "button">Back to home </button>
    </a>
    `
  }
}

generateCartItems()

let increment1 = (id) => {
  let selectedItem = id
  let search = basket1.find((x) => x.id === selectedItem.id)

  if (search === undefined) {
    basket1.push({
      id: selectedItem.id,
      item: 1
    })
  }
  else {
    search.item += 1
  }
  generateCartItems()
  localStorage.setItem("data", JSON.stringify(basket1))


  // console.log(basket)
  update1(selectedItem.id)
}

let decrement1 = (id) => {
  let selectedItem = id
  let search = basket1.find((x) => x.id === selectedItem.id)

  if (search === undefined) return
  else if (search.item === 0) return
  else {
    search.item -= 1
  }
  update1(selectedItem.id)
  basket1 = basket1.filter((x) => x.item !== 0)
  generateCartItems()

  localStorage.setItem("data", JSON.stringify(basket1))
}

let update1 = (id) => {
  let search = basket1.find((x) => x.id === id)
  // console.log(search.item)
  document.getElementById(id).innerHTML = search.item
  caculation1()
  TotalAmount()

}

let removeItems = (id) => {
  let selectedItem = id
  basket1 = basket1.filter((x) => x.id !== selectedItem.id)
  generateCartItems()
  TotalAmount()
  localStorage.setItem("data", JSON.stringify(basket1))


}


let ClearCart = () => {
  basket1 = []
  generateCartItems()
  localStorage.setItem("data", JSON.stringify(basket1))
}

let TotalAmount = () => {
  if (basket.length != 0) {
    let amount = basket1.map((x) => {
      let { id, item } = x
      let search = shopItemsData.find((y) => y.id === id) || []
      return item * search.price
    }).reduce((x, y) => x + y, 0)
    console.log(amount)
    label.innerHTML = `
<h2>Total Bill: $${amount}</h2>
<div class =  check-and-clear-button>
<button class = "checkoutbtn">Checkout</button>
<button  onclick = "ClearCart()" class ="clearcartbtn">Clear cart </button>
</div>
`
    console.log(label)



  } else return
}

TotalAmount()





