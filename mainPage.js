
window.addEventListener("load", () => {
    loadCards()
});
function loadCards() {
    $.ajax({
        type: "GET",
        url: `http://127.0.0.1:3000/api`,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(data);
            const container = document.getElementById('card-storage');
            container.innerHTML = '';
            let cardHTML = '';
            data.forEach((pet, index) => {
                if (index < 9) {
                    if (index % 3 === 0) {
                        cardHTML += '<div class="row">';
                    }

                    cardHTML += `
                        <div class="col">
                            <div class="card" style="width: 18rem;">
                                <img src="${pet.image}" class="card-img-top" alt="Image of the pet">
                                <div class="card-body">
                                    <h5 class="card-title" style="color: ${pet.color};">${pet.name} - ${pet.breed} ${pet.type}</h5>
                                    <p class="card-text">Sex: ${pet.sex} | Age: ${pet.age} | Color: ${pet.color} | Spayed: ${pet.spayed}</p>
                                    
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal${pet.ID}">
                                        Show Pet Details
                                    </button>

                                    <div class="modal fade" id="modal${pet.ID}" tabindex="-1" aria-labelledby="ModalLabel${pet.ID}" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="ModalLabel${pet.ID}">Pet Details</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="row">
                                                        <article class="col-6">
                                                            <p>${pet.name} is a ${pet.age} year old ${pet.sex} ${pet.breed} ${pet.type} waiting for a home. ${pet.description}</p>
                                                        </article>
                                                        <aside class="col-6">
                                                            <img src="${pet.image}" class="img-fluid" alt="Image of pet">
                                                        </aside>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <a href="delete.html?id=${pet.ID}" class="btn btn-danger">Delete Pet Entry</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    if (index % 3 === 2 || index === data.length - 1) {
                        cardHTML += '</div>';
                    }
                }
            });
            container.innerHTML += cardHTML;
            container.innerHTML += `<div class="text-center my-3">
                                        <a class="btn btn-primary" href="create.html">Create</a>
                                    </div>`;
        },
        error: function (errMsg) {
            console.log(errMsg);
            document.getElementById("status").innerText = "Error loading data!";
        }
    });
}

