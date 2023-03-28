const loadPhones = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
   displayPhones(data.data, dataLimit)
}

const displayPhones = (phones, dataLimit)=> {
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.innerText = ''
    // phones = phones.slice(0,6)

    const showAll = document.getElementById('show-all')

    if(dataLimit && phones.length > 10){
      phones = phones.slice(0,10)
      showAll.classList.remove('d-none')
    }
    else{
      showAll.classList.add('d-none')
    }
    
    const noPhone = document.getElementById('no-phone-found')
    if(phones.length === 0){
      noPhone.classList.remove('d-none')
    } else{
      noPhone.classList.add('d-none')
    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card">
                    <img src="${phone.image}" class="card-img-top container w-50" alt="...">
                    <div class="card-body text-center">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p>${phone.brand}</p>
                      
                      
                      <button onclick= loadPhoneDetail('${phone.slug}') class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal"> Show Details</button>

                    </div>
                  </div>
        `
        phoneContainer.appendChild(phoneDiv)
        
    });
    toggleSpiner(false)
}
  const processSearch=(dataLimit)=>{
  toggleSpiner(true)
  const searchField = document.getElementById('search-field')
  const searchText = searchField.value
  loadPhones(searchText, dataLimit) 
}
document.getElementById('btn-search').addEventListener('click', function(){
 processSearch(10)
})
document.getElementById('search-field').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
  processSearch(10)
  }
});


const toggleSpiner = isLoading =>{
  const spinSection = document.getElementById('loader')
  if(isLoading){
    spinSection.classList.remove('d-none')
  }else{
    spinSection.classList.add('d-none')
  }
}
document.getElementById('btn-show-all').addEventListener('click', function(){
  processSearch()
})


const loadPhoneDetail = id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayPhoneDeetails(data.data))
}

function displayPhoneDeetails(phone){
  console.log(phone.mainFeatures)
  const modalTitle = document.getElementById('phoneDetailModalLabel')
  modalTitle.innerText = phone.name
  const phoneDetails = document.getElementById('phone-details')
  phoneDetails.innerHTML = `
  <p>${phone.releaseDate ? phone.releaseDate : "No Release Date"}</p>
  <p>Storage: ${phone.mainFeatures.storage ? phone.mainFeatures.storage : "No Release Date"}</p>
  <p>Chip Set: ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : "No main features"}</p>
  <p>Display Size: ${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : "No main features"}</p>
  <p>Memory: ${phone.mainFeatures.memory ? phone.mainFeatures.memory : "No main features"}</p>
  <p>Sensors: ${phone.mainFeatures.sensor ? phone.mainFeatures.sensor : "No main features"}</p>

  `
}
  // loadPhones('apple')