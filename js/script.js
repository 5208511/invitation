// Sections
const envelopeCover = document.getElementById('envelope-cover');
const openBtn = document.getElementById('open-envelope');
const dateSelection = document.getElementById('date-selection');
const confirmationScreen = document.getElementById('confirmation-screen');
const backBtn = document.getElementById('back-to-envelope');

// Formspree elements
const pickForm = document.getElementById('pick-form');
const choiceField = document.getElementById('choice-field');

// Envelope Open
openBtn.addEventListener('click', () => {
  envelopeCover.classList.remove('show');
  setTimeout(() => {
    envelopeCover.classList.add('hidden');
    dateSelection.classList.remove('hidden');
    setTimeout(() => dateSelection.classList.add('show'), 50);
  }, 1000);
});

// Pick a date
const buttons = document.querySelectorAll('.pick-btn');
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const choice = btn.parentElement.getAttribute('data-choice');
    choiceField.value = choice; // set hidden input value

    // Submit form via AJAX to avoid page reload
    fetch(pickForm.action, {
      method: 'POST',
      body: new FormData(pickForm),
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      showConfirmation();
    })
    .catch(error => {
      console.error('Form submission error:', error);
      showConfirmation();
    });
  });
});

// Show confirmation page
function showConfirmation() {
  dateSelection.classList.remove('show');
  setTimeout(() => {
    dateSelection.classList.add('hidden');
    confirmationScreen.classList.remove('hidden');
    setTimeout(() => confirmationScreen.classList.add('show'), 50);
  }, 1000);
}

// Back to Envelope
backBtn.addEventListener('click', () => {
  confirmationScreen.classList.remove('show');
  setTimeout(() => {
    confirmationScreen.classList.add('hidden');
    envelopeCover.classList.remove('hidden');
    setTimeout(() => envelopeCover.classList.add('show'), 50);
  }, 1000);
});

// Header Color Cycling
const colorHeaders = document.querySelectorAll('#envelope-header, .color-cycle, #confirmation-screen h2');
const colors = ['#ff6b8a', '#ff9cb1', '#ffa3c2', '#ffb3d0'];
let colorIndex = 0;
setInterval(() => {
  colorHeaders.forEach(h => h.style.color = colors[colorIndex]);
  colorIndex = (colorIndex + 1) % colors.length;
}, 500);

// Heart Cursor Trail
document.addEventListener('mousemove', e => {
  const heart = document.createElement('div');
  heart.textContent = '♡';
  heart.style.position = 'absolute';
  heart.style.left = e.pageX + 'px';
  heart.style.top = e.pageY + 'px';
  heart.style.pointerEvents = 'none';
  heart.style.fontSize = '20px';
  heart.style.userSelect = 'none';
  heart.style.color = '#ff6b8a';
  heart.style.transition = 'transform 0.5s, opacity 0.5s';
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.style.opacity = '0';
    heart.style.transform = 'scale(1.5)';
  }, 50);

  setTimeout(() => heart.remove(), 600);
});
