document.getElementById('error-message').style.display = 'none';
document.getElementById('error-message-not-found').style.display = 'none';
document.getElementById('error-message-null').style.display = 'none';
const phoneDetails = document.getElementById('phone-details');
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('error-message-not-found').style.display = 'none';
    document.getElementById('error-message-null').style.display = 'none';
    if (searchText == '') {
        document.getElementById('error-message-null').style.display = 'block';
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
        document.getElementById('error-message-not-found').style.display = 'block';
    }
    phones.slice(0, 20).forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 px-1 py-3 shadow rounded">
            <img src="${phone.image}" class="card-img-top w-75 m-auto" alt="...">
            <div class="card-body">
                <h5 class="card-title fw-normal">Name: ${phone.phone_name}</h5>
                <p class="card-text fw-normal">Brand: ${phone.brand}</p>
                
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
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <div class="card h-100 px-1 py-3 shadow rounded d-md-flex flex-md-row">
            <div class="w-50">
                <img  src="${phone.image}" class="card-img-top  m-auto " alt="...">
            </div>
            <div class="card-body w-50">
                <h5 class="card-title fw-normal">Name: ${phone.name}</h5>
                <p class="card-text fw-normal">Brand: ${phone.brand}</p>
                <p class="card-text">ReleaseDate: ${phone.releaseDate}</p>
                <h5 class="card-title fw-normal">Main Features</h5>
                <p class="card-text">Storage: ${phone.mainFeatures.storage}</p>
                <p class="card-text">Display Size: ${phone.mainFeatures.displaySize}</p>
                <p class="card-text">ChipSet: ${phone.mainFeatures.chipSet}</p>
                <p class="card-text">Memory: ${phone.mainFeatures.memory}</p>
                <p class="card-text">Storage: ${phone.mainFeatures.storage}</p>
                <p class="card-text">Sensors: ${phone.mainFeatures.sensors}</p>
                <h5 class="card-title fw-normal"> Other Features </h5>
                <p class="card-text">Bluetooth: ${phone.others.Bluetooth}</p>
                <p class="card-text">GPS: ${phone.others.GPS}</p>
                <p class="card-text">NFC: ${phone.others.NFC}</p>
                <p class="card-text">Radio: ${phone.others.Radio}</p>
                <p class="card-text">USB: ${phone.others.USB}</p>
                <p class="card-text">WLAN: ${phone.others.WLAN}</p>
               
            </div >


        </div >

    `;
    phoneDetails.appendChild(div);
}