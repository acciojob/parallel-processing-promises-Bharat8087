 const output = document.getElementById("output");
        const btn = document.getElementById("download-images-button");

        const images = [
            { url: "https://picsum.photos/id/237/200/300" },
            { url: "https://picsum.photos/id/238/200/300" },
            { url: "https://picsum.photos/id/239/200/300" },
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

        btn.addEventListener('click', () => {
            output.innerHTML = ''; // Clear previous images

            downloadImages(images)
                .then(loadedImages => {
                    loadedImages.forEach(img => {
                        const imageContainer = document.createElement('div');
                        imageContainer.classList.add('image-container');
                        const imageElement = new Image();
                        imageElement.src = img.src;
                        imageContainer.appendChild(imageElement);
                        output.appendChild(imageContainer);
                    });
                })
                .catch(error => {
                    console.error(error);
                });
        });