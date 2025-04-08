
window.addEventListener("load", () => {
    loadCards()
});
function loadCards(){
    $.ajax({
        type: "GET",
        url: `http://127.0.0.1:3000/api`,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            console.log(data);
            const container = document.getElementById('card-storage');
            container.innerHTML = '';
            let cardHTML = ''
            data.forEach((pet,index) => {
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
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#petModal">
                                    Show Pet Details
                                </button>

                                <div class="modal fade" id="petModal" tabindex="-1" aria-labelledby="petModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="petModalLabel">Pet Details</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="row">
                                                    <article class="col-6" id="info">
                                                        <p id="pet-info">${pet.name} is a ${pet.age} year old ${pet.sex} ${pet.breed} ${pet.type} waiting for a home. ${pet.description}<br><br> Color: ${pet.color} <br> Spayed: ${pet.spayed} <br> Status: ${pet.status} <br> Microchip Number: ${pet.microchip_number}</p>
                                                    </article>
                                                    <aside class="col-6 d-flex justify-content-end align-items-center" id="picture">
                                                        <img src="${pet.image}" class="img-fluid" alt="Image of pet" id="pet-image">
                                                    </aside>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                    if(index % 3 == 2){
                        cardHTML += '\n</div>\n'
                    }
                }
            });
            if (data.length % 3 !== 0) {
                cardHTML += '\n</div>\n';
            }
            container.innerHTML += cardHTML;
            container.innerHTML += `<div class="text-center my-3">
                                        <a class="btn btn-primary" href="create.html">Create</a>
                                    </div>`;
        },        
        error: function(errMsg) {
            console.log(errMsg);
            document.getElementById("status").innerText = "Error loading data!";
        }
    });
}
