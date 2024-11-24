window.onload = function () {
    display();
};

function handleFormSubmit(event) {
    event.preventDefault();

    const price = document.getElementById("price").value;
    const product_details = document.getElementById("product").value;
    const selectoption = document.getElementById("selectOptions");
    const catagary = selectoption.options[selectoption.selectedIndex].text.toLowerCase();

    let obj = {
        price: price,
        product_details: product_details,
        catagary: catagary
    };
    console.log(obj);
    axios.post("http://localhost:2000/add-expence", obj)
        .then((res) => {
            console.log(res);
            display();
        }).catch((err) => {
            console.log(err);
        });

    event.target.reset();
}

function display() {
    const categories = ['electronics', 'sports', 'food', 'all'];

    axios.get("http://localhost:2000/all-expence")
        .then((response) => {
            categories.forEach((category) => {
                const ele = document.getElementById(category);
                if (ele) {

                    ele.innerHTML = "";

                    if (Array.isArray(response.data)) {
                        for (let i = 0; i < response.data.length; i++) {
                            const item = response.data[i];

                            if (category === "all" || item.catagary.toLowerCase() === category) {
                                const listItem = document.createElement('li');
                                listItem.classList.add('list-group-item', 'd-flex','m-1','p-1', 'align-items-center');
                                listItem.innerHTML = `${item.price} - ${item.product_details} - ${item.catagary}`;

                                const deleteBtn = document.createElement('button');
                                deleteBtn.innerText = 'Delete';
                                deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
                                deleteBtn.setAttribute('data-id', item.id);

                                const editBtn = document.createElement('button');
                                editBtn.innerText ='Edit';
                                editBtn.classList.add('btn', 'btn-warning', 'btn-sm', 'm-1');
                                editBtn.setAttribute('data-id', item.id);

                                editBtn.onclick = function () {
                                    editExpence(item.id, item);
                                }
                                deleteBtn.onclick = function () {
                                    deleteExpence(item.id);
                                };
                                listItem.appendChild(editBtn);
                                listItem.appendChild(deleteBtn);
                                ele.appendChild(listItem);
                            }
                        }
                    }
                }
            });
        }).catch((err) => {
            console.log(err);
        });
}

function deleteExpence(id) {
    axios.delete(`http://localhost:2000/delete-expence/${id}`)
        .then((res) => {
            console.log(res);
            display();
        }).catch((err) => {
            console.log(err);
        });
}

function editExpence(id, expenceBody) {

    const updatedPrice = prompt("Enter new price", expenceBody.price) || expenceBody.price;
    const updatedDetails = prompt("Enter new product details", expenceBody.product_details) || expenceBody.product_details;
    const updatedCategory = prompt("Enter new category", expenceBody.catagary) || expenceBody.catagary;

    const updatedExpence = {
        price: updatedPrice,
        product_details: updatedDetails,
        catagary: updatedCategory.toLowerCase()
    };
    axios.put(`http://localhost:2000/edit-expence/${id}`, updatedExpence)
        .then((res) => {

            console.log(username);
            console.log(res);
            display();
        }).catch((err) => {
            console.log(err);
        });
};