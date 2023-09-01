const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/videos/categories')
        .then(res => res.json())
        .then(data =>showData(data.data))
    }


        const showData = (data) => {
            const buttonContainer = document.getElementById('buttonContainer');
            for (const element of data) {
                const div = document.createElement('div');
                div.innerHTML =
                `
                <button onclick="handleLoadCategories('${element.category_id}')" class="btn btn-ghost bg-red-600 text-white ">
                    ${element.category}
                </button>

                `;
                buttonContainer.appendChild(div);
            }
        }

        const handleLoadCategories = async (id) => {
        const res = `https://openapi.programming-hero.com/api/videos/category/${id}`;
        try {
            const response = await fetch(res);
            const data = await response.json();
            showLoadCategories(data.data);
        } catch (error) {
            console.error(error);
        }
    }
    const showLoadCategories = (data) => {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = " ";
    if(data.length === 0) {
        const div = document.createElement('div');
        cardContainer.classList.remove('grid', 'grid-cols-1', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-4');
        div.classList.add('flex-col', 'items-center', 'justify-center' );
        div.innerHTML = `
            <img class="w-[200] mx-auto" src="images/Icon.png" alt="No Content" />
            <h1 class="text-6xl font-black text-center mt-4">Oops!! Sorry, There is no <br/> content here</h1>
        `;
        cardContainer.appendChild(div);
    }
    else{
        cardContainer.classList.add('grid', 'grid-cols-1', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-4');
        for (const card of data) {

        const div = document.createElement('div');
        div.classList.add('card', 'bg-base-100', 'shadow-xl');
        const seconds = parseInt(card.others.posted_date);
        if (isNaN(seconds) || seconds < 60) {
            var formattedTime = '';
        } else {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            formattedTime = `${hours}hrs ${minutes}min ago`;
        }
         div.innerHTML = `
            <figure class=" h-[200px] relative"><img src="${card.thumbnail}" alt="Thumbnail" /></figure>
            <p class="text-center timeConvert absolute bottom-48 right-12 text-xl text-white bg-black px-2 rounded">${formattedTime}</p>
            <div class="flex gap-4 justify-around mt-4 px-5">
                <img src="${card.authors[0].profile_picture}" alt="Author" class="w-10 h-10 rounded-full">
                <h1 class="card-title font-bold">${card.title}</h1>
            </div>
            <div class="card-body">
                <h2 class="text-center text-xl">${card.authors[0].profile_name}</h2>
                <div class="flex justify-center">
                     <p class="text-center viewsText">${card.others.views}</p>   
                </div>
            </div>     
        `;
        
        cardContainer.appendChild(div);    
    }
    }
}


loadData();
handleLoadCategories(1000);
