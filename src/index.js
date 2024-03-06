// write your code here 
document.addEventListener("DOMContentLoaded", () => {
  displayRamens();
  addsubmitListener();

})   


function displayRamens() {
    fetch('http://localhost:3000/ramens')
      .then(res => res.json())
      .then(ramens => ramens.forEach(ramen => renderOneRamen(ramen)))
    
}

function renderOneRamen(ramen) {
    const ramenImg = document.createElement('img'); 
    const ramenmenu = document.getElementById('ramen-menu');

    ramenImg.src = ramen.image;

    ramenmenu.append(ramenImg);

    ramenImg.addEventListener('click', () => showRamenDetails(ramen)); 

}

function showRamenDetails(ramen) {
    const detailImage = document.querySelector('.detail-image');
    const detailName = document.querySelector('.name');
    const detailRestaurant = document.querySelector('.restaurant');
    const detailRating = document.getElementById('rating-display');
    const detailComment = document.getElementById('comment-display');

    detailImage.src = ramen.image;
    detailName.textContent = ramen.name;
    detailRestaurant.textContent = ramen.restaurant;
    detailRating.textContent = ramen.rating;
    detailComment.textContent = ramen.comment;
}

function addsubmitListener() {
    const ramenForm = document.getElementById('new-ramen');

    ramenForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newImage = document.getElementById('new-image').value;
        const newName = document.getElementById('new-name').value;
        const newRestaurant = document.getElementById('new-restaurant').value;
        const newRating = document.getElementById('new-rating').value;
        const newComment = document.getElementById('new-comment').value;

        ramenForm.reset();

        const newRamen = {
            "name": newName,
            "restaurant": newRestaurant,
            "image": newImage,
            "rating": newRating,
            "comment": newComment,
        };

        fetch('http://localhost:3000/ramens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRamen)
        })
        renderOneRamen(newRamen);

        showRamenDetails(newRamen);
        
    });
    }
