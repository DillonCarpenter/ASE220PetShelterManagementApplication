
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
            if (data.length % 3 !== 0) {
                cardHTML += '\n</div>\n';
            }
            container.innerHTML += cardHTML;
            container.innerHTML += `<div class="text-center my-3">
                                        <a class="btn btn-primary" href="create.html">Create</a>
                                    </div>`;
        }        
    });
}
