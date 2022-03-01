document.getElementById('error-message').style.display = 'none';
const phoneDetails = document.getElementById('phone-details');
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    if (searchText == '') {
        // please write something to display
    }
    else {
        // load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data))
            .catch(error => displayError(error));
    }
}

const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}

const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    phoneDetails.textContent = '';
    if (phones.length == 0) {
        // show no result found;
    }
    phones.slice(0, 20).forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 px-1 py-3 shadow rounded">
            <img src="${phone.image}" class="card-img-top w-75 m-auto" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
            </div>
            <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="btn btn-primary w-50 mx-auto">Explore</button>

        </div>
        `;
        searchResult.appendChild(div);
    })
}

const loadPhoneDetail = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));
}

const displayPhoneDetail = phone => {


    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <div class="card h-100 px-1 py-3 shadow rounded d-md-flex flex-md-row">
            <div>
                <img src="${phone.image}" class="card-img-top  m-auto" alt="...">
            </div>
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
            </div>

        </div>
 
    `;
    phoneDetails.appendChild(div);
}