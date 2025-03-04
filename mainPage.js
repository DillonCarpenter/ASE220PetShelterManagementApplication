let jsonData;

window.addEventListener("load", () => {
    fetch("data.json")
    .then(res => res.json())
    .then(data => 
        {
            jsonData = data
            loadCards()
        })
    .catch(err => console.log(err));
});

function loadCards(){
    
    const container = document.getElementById('card-storage');
    container.innerHTML = '';
    let cardHTML = ''
    jsonData.forEach((pet,index) => {
        if(index < 9){
            if(index % 3 == 0){
                cardHTML += '<div class="row">\n'
            }
            cardHTML += `
            <div class="col">
                <div class="card" style="width: 18rem;">
                    <img src="${pet.image}" class="card-img-top" alt="Image of the pet">
                    <div class="card-body">
                        <h5 class="card-title" style="color: ${pet.color};">${pet.name} - ${pet.breed} ${pet.type}</h5>
                        <p class="card-text">Sex: ${pet.sex} | Age: ${pet.age} | Color: ${pet.color} | Spayed: ${pet.spayed}</p>
                        <a href="detailLayout.html?id=${pet.ID}" class="btn btn-primary">View detailed page</a>
                    </div>
                </div>
            </div>
            `;
            if(index % 3 == 2){
                cardHTML += '\n</div>\n'
            }
        }
    });
    if (jsonData.length % 3 !== 0) {
        cardHTML += '\n</div>\n';
    }
    container.innerHTML += cardHTML;
    //This isn't getting added for some reason.
    container.insertAdjacentHTML("afterend", '<a class="btn btn-primary" href="create.html>Create</a>');
}
