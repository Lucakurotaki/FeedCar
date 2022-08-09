const newPost = async () =>{
    const vehicleModelElement = document.getElementById('vehicle-model');
    const vehicleYearElement = document.getElementById('vehicle-year');
    const vehicleEngineElement = document.getElementById('vehicle-engine');
    const vehicleGearElement = document.getElementById('vehicle-gear');
    const vehicleOnSaleElement = document.getElementById('vehicle-onSale');
    const vehicleRentElement = document.getElementById('vehicle-rent');
    const vehicleValueElement = document.getElementById('vehicle-value');


    const post = {
        model: vehicleModelElement.value,
        year: vehicleYearElement.value,
        engine: vehicleEngineElement.value,
        gear: vehicleGearElement.value,
        onSale: vehicleOnSaleElement.value,
        rent: vehicleRentElement.value,
        value: vehicleValueElement.value
    }

    const init = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(post)
    }


    const response = await fetch(`http://localhost:3000/vehicles`, init);
    const data = await response.json();

    const id = data.id;

    location.href=`post.html?` + `id=${id}`;
}


window.onload = () =>{
    const btnNewPost = document.getElementById('btn-new-post');
    btnNewPost.onclick = newPost;
}