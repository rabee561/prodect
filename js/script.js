let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let form = document.getElementById("form");
let state = 'create'

let mood = "create";
let tmp;

// method input
function getTotal() {
    if (price.value != "") {
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "#040";
    } else {
        total.innerHTML = "";
        total.style.backgroundColor = "#a00d02";
    }
}

// save data and save in localstorge
let pro;
if (localStorage.prodect != null) {
    pro = JSON.parse(localStorage.prodect)
} else {
    pro = [];
}
// create in enter
form.addEventListener('submit', function(e) {
    e.preventDefault()
})

submit.onclick = function() {
    let x = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    };
    if (mood === 'create') {
        if (x.count > 1) {
            for (let i = 0; i < x.count; i++) {
                pro.push(x);
            }
        } else {
            pro.push(x);
            mood = "create";
            submit.innerHTML = 'Create';
            count.style.display = "block"
        }
    } else {
        pro[tmp] = x;
        submit.innerHTML = "Create"
        count.style.display = 'block'
    }
    localStorage.setItem('prodect', JSON.stringify(pro));
    console.log(pro);
    cleardata()
    showdata()
};
// clear input
function cleardata() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

// read input

function showdata() {
    getTotal()
    let table = "";
    for (let i = 0; i < pro.length; i++) {
        table += `
        <tr>
        <th>${i}</th>
        <th>${pro[i].title}</th>
        <th>${pro[i].price}</th>
        <th>${pro[i].taxes}</th>
        <th>${pro[i].ads}</th>
        <th>${pro[i].discount}</th>
        <th>${pro[i].total}</th>
        <th>${pro[i].category}</th>
        <td><button onclick="updatedata(${i})" id="update">Update</button></td>
        <td><button onclick="deletedata(${i})" id="delte">Delete</button></td>
    </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    // deleteAll
    let btndeleteall = document.getElementById("deleteAll");
    if (pro.length > 0) { // اذا كان يوجد قيمة
        btndeleteall.innerHTML =
            `<button onclick="deleteAll()">DeleteAll (${pro.length})</button>
        `
    } else {
        btndeleteall.innerHTML = ""
    }
}
showdata()

// delete
function deletedata(i) {
    pro.splice(i, 1);
    localStorage.prodect = JSON.stringify(pro); //
    showdata()
}

// deleteAll
function deleteAll() {
    localStorage.clear()
    pro.splice(0)
    showdata()
}
// update
function updatedata(i) {
    title.value = pro[i].title;
    price.value = pro[i].price;
    taxes.value = pro[i].taxes;
    ads.value = pro[i].ads;
    discount.value = pro[i].discount;
    category.value = pro[i].category;
    getTotal()
    count.style.display = "none"
    submit.innerHTML = 'Update';
    mood = 'Update';
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

// serach
let serachmood = "title";

function getserach(id) {
    let inserach = document.getElementById("serach");
    if (id == "serach-title") {
        serachmood = "title";
        inserach.placeholder = "Serach By Title";
    } else {
        serachmood = "category";
        inserach.placeholder = "Serach By Gategory";
    }
    inserach.focus();
    console.log(serachmood)
}