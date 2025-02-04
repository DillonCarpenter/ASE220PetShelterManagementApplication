let jsonData;

window.addEventListener("load", () => {
    fetch("data.json")
    .then(res => res.json())
    .then(data => 
        {
            jsonData = data
            loadCard()
        })
    .catch(err => console.log(err));
});

function loadCard(){
    const params = new URLSearchParams(window.location.search);
    const petID = params.get("id");
    jsonData.forEach(pet => {
    if(pet.ID==petID){
        const infoContainer = document.getElementById('info');
        infoContainer.innerHTML = `
            <h2>${pet.name}</h2>
            <p>
                <strong>Breed:</strong> ${pet.breed}<br>
                <strong>Type:</strong> ${pet.type}<br>
                <strong>Color:</strong> ${pet.color}<br>
                <strong>Sex:</strong> ${pet.sex}<br>
                <strong>Age:</strong> ${pet.age}<br>
                <strong>ID:</strong> ${pet.ID}<br>
                <strong>Spayed:</strong> ${pet.spayed}<br>
                <strong>Microchip Number:</strong> ${pet.microchip_number}<br>
                <strong>Status:</strong> ${pet.status}<br>
                <strong>Description:</strong> ${pet.description}<br>

            </p>
        `;
        pictureContainer = document.getElementById('picture');
        pictureContainer.innerHTML = `
            <img src="${pet.image}" class="image-fluid" alt="Image of the pet">
        `;
    }
    });
}