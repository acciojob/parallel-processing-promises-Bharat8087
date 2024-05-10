 const images = [
            { url: 'image1.jpg' },
            { url: 'image2.jpg' },
            { url: 'image3.jpg' }
        ];

        function downloadImages(images) {
            const promises = images.map(image => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => resolve(img);
                    img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`));
                    img.src = image.url;
                });
            });

            return Promise.all(promises);
        }

        document.getElementById('download-images-button').addEventListener('click', () => {
            const outputDiv = document.getElementById('output');
            outputDiv.innerHTML = ''; 

            downloadImages(images)
                .then(loadedImages => {
                    loadedImages.forEach(img => {
                        const imageContainer = document.createElement('div');
                        imageContainer.classList.add('image-container');
                        const imageElement = new Image();
                        imageElement.src = img.src;
                        imageContainer.appendChild(imageElement);
                        outputDiv.appendChild(imageContainer);
                    });
                })
                .catch(error => {
                    console.error(error);
                });
        });