const API_KEY = "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";

const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', fetchImages);

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('keydown', (event) => {
    if (event.key == "Enter") {
        fetchImages();
    }
})

async function fetchImages() {
    const prompt = searchInput.value;

    const numImages = 4;
    const imageGrid = document.getElementById('imageGrid');

    imageGrid.innerHTML = '';
    showLoadingAnimation();
    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                prompt: prompt,
                n: numImages,
                size: '512x512',
            })
        });

        const data = await response.json();
        console.log(data);
        
        if (response.ok) {
            data.data.forEach(image => {
                const generateURL = image.url;
                const imageCard = document.createElement('div');
                imageCard.classList.add('image-card');
                const img = document.createElement('img');
                img.src = generateURL;
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                })

                imageCard.appendChild(img);
                imageGrid.appendChild(imageCard);
            })
        }else{
            console.error('Image fetch failed: ', data.error);
        }

    } catch (error) {
        console.error("Error : ", error);
    }
    hideLoadingAnimation();
}

const showLoadingAnimation = () => {
    const icon = document.getElementById('searchBtnIcon');
    icon.style.display = 'none';
    const loader = document.getElementById('loadingAnimation');
    loader.style.display = 'block';
}

const hideLoadingAnimation = () => {
    const icon = document.getElementById('searchBtnIcon');
    icon.style.display = 'block';
    const loader = document.getElementById('loadingAnimation');
    loader.style.display = 'none';
}