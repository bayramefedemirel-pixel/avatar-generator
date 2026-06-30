const avatarImg = document.getElementById('avatar-img');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');
const styleSelect = document.getElementById('style-select');
const loader = document.getElementById('loader');

let currentAvatarUrl = avatarImg.src;

function generateRandomSeed() {
    return Math.random().toString(36).substring(2, 10) + Date.now().toString().substring(10);
}

function updateAvatar() {
    loader.style.display = 'block';
    avatarImg.style.opacity = '0.3';

    const selectedStyle = styleSelect.value;
    const randomSeed = generateRandomSeed();
    const newUrl = `https://api.dicebear.com/9.x/${selectedStyle}/svg?seed=${randomSeed}`;
    
    avatarImg.src = newUrl;
    currentAvatarUrl = newUrl;
}

avatarImg.addEventListener('load', () => {
    loader.style.display = 'none';
    avatarImg.style.opacity = '1';
});

async function downloadAvatar() {
    try {
        const response = await fetch(currentAvatarUrl);
        const svgText = await response.text();
        const blob = new Blob([svgText], { type: 'image/svg+xml' });
        const blobUrl = URL.createObjectURL(blob);

        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = `avatar-${Date.now()}.svg`;
        
        document.body.appendChild(downloadLink);
        downloadLink.click();
        
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error(error);
        alert('İndirme işlemi başarısız oldu.');
    }
}

generateBtn.addEventListener('click', updateAvatar);
styleSelect.addEventListener('change', updateAvatar);
downloadBtn.addEventListener('click', downloadAvatar);