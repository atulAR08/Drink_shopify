function selectSubscription(element, type) {
    // Remove selected class from all subscription options
    document.querySelectorAll('.subscription-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    element.classList.add('selected');
    
    // Check the radio button
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
    // Remove selected class from all single flavor options
    document.querySelectorAll('#singleFlavorSection .flavor-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    element.classList.add('selected');
    
    // Check the radio button
    element.querySelector('input[type="radio"]').checked = true;
    
    // Update main bottle color to match selected flavor
    changeMainBottle(flavor);
     updateDropdown(flavor);
}

function selectDoubleFlavor(element, flavorGroup, flavor) {
    // Remove selected class from all options in the same flavor group
    document.querySelectorAll(`input[name="${flavorGroup}"]`).forEach(input => {
        input.closest('.flavor-option').classList.remove('selected');
    });
    
    // Add selected class to clicked option
    element.classList.add('selected');
    
    // Check the radio button
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
    const mainBottle = document.getElementById('mainBottle');
    mainBottle.className = `main-bottle ${flavor}`;
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
    // Add more image paths as needed
  ];
  
  let currentIndex = 0;
  const carouselImage = document.getElementById('carouselImage');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  function showImage(index) {
    carouselImage.src = images[index];
  }
  
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });
  
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });
