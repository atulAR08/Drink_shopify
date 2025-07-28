
function selectSubscription(element, type) {
    // Remove selected class from all subscription options
    document.querySelectorAll('.subscription-option').forEach(option => {
        option.classList.remove('selected');
    });
    
   
    element.classList.add('selected');
    
    
    element.querySelector('input[type="radio"]').checked = true;
    
    // Show/hide appropriate flavor sections
    const singleSection = document.getElementById('singleFlavorSection');
    const doubleSection = document.getElementById('doubleFlavorSection');
    const singleIncluded = document.getElementById('singleIncluded');
    const doubleIncluded = document.getElementById('doubleIncluded');
    
    if (type === 'single') {
        singleSection.style.display = 'block';
        doubleSection.style.display = 'none';
        singleIncluded.style.display = 'block';
        doubleIncluded.style.display = 'none';
    } else if (type === 'double') {
        singleSection.style.display = 'none';
        doubleSection.style.display = 'block';
        singleIncluded.style.display = 'none';
        doubleIncluded.style.display = 'block';
        updateDoubleSubscriptionDisplay();
    }
}

function selectFlavor(element, flavor) {
    document.querySelectorAll('#singleFlavorSection .flavor-option').forEach(option => {
        option.classList.remove('selected');
    });
    
  
    element.classList.add('selected');
   
    element.querySelector('input[type="radio"]').checked = true;
    
    
    changeMainBottle(flavor);
     updateDropdown(flavor);
}

function selectDoubleFlavor(element, flavorGroup, flavor) {
    
    document.querySelectorAll(`input[name="${flavorGroup}"]`).forEach(input => {
        input.closest('.flavor-option').classList.remove('selected');
    });
    
   
    element.classList.add('selected');
    
   
    element.querySelector('input[type="radio"]').checked = true;
    
    // Update displays for double subscription
    updateDoubleSubscriptionDisplay();
}

function updateDoubleSubscriptionDisplay() {
    const flavor1 = document.querySelector('input[name="flavor1"]:checked')?.value || 'chocolate';
    const flavor2 = document.querySelector('input[name="flavor2"]:checked')?.value || 'vanilla';
    
    // Update recurring bottles (Every 30 Days)
    const recurringBottle1 = document.getElementById('recurringBottle1');
    const recurringBottle2 = document.getElementById('recurringBottle2');
    
    if (recurringBottle1) recurringBottle1.className = `small-bottle ${flavor1}`;
    if (recurringBottle2) recurringBottle2.className = `small-bottle ${flavor2}`;
    
    // Update free bottles display
    const freeBottlesDisplay = document.getElementById('freeBottles');
    if (freeBottlesDisplay) {
        const allFlavors = ['chocolate', 'vanilla', 'orange'];
        const selectedFlavors = [flavor1, flavor2];
        const additionalFlavor = allFlavors.find(flavor => !selectedFlavors.includes(flavor)) || 'chocolate';
        
        const uniqueFlavors = [...new Set([flavor1, flavor2, additionalFlavor])];
        
        freeBottlesDisplay.innerHTML = uniqueFlavors
            .map(flavor => `<div class="small-bottle ${flavor}"></div>`)
            .join('');
    }
}

function changeMainBottle(flavor) {
    const carouselImage = document.getElementById('carouselImage');
    if (carouselImage) {
        const flavorImages = {
            'chocolate': 'Drink_img1.webp',
            'vanilla': 'Drink_img2.webp',
            'orange': 'Drink_img3.webp'
        };
        carouselImage.src = flavorImages[flavor] || 'Drink_img1.webp';
    }
}
function updateDropdown(flavor) {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
       
        const options = dropdown.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value.toLowerCase() === flavor || 
                options[i].text.toLowerCase() === flavor) {
                dropdown.selectedIndex = i;
                break;
            }
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    selectFlavor(document.querySelector('#singleFlavorSection .flavor-option.selected'), 'chocolate');
    updateDoubleSubscriptionDisplay();
});
const images = [
    'Drink_img1.webp',
    'Drink_img2.webp',
    'Drink_img3.webp'
  
  ];
  
  let currentIndex = 0;
  const carouselImage = document.getElementById('carouselImage');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const thumbnailsContainer = document.getElementById('thumbnails');
  
  function showImage(index) {
    carouselImage.src = images[index];
    updateThumbnails();
  }
  function updateThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, idx) => {
      thumb.classList.toggle('active', idx === currentIndex);
    });
  }
  images.forEach((imgSrc, idx) => {
    const thumb = document.createElement('img');
    thumb.src = imgSrc;
    thumb.className = 'thumbnail';
    thumb.onclick = () => {
      currentIndex = idx;
      showImage(currentIndex);
    };
   
  });
  
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });
  
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });
  showImage(currentIndex);
