// DOM Elements
const contactForm = document.getElementById('contactForm');
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');
const imageUrl = document.getElementById('imageUrl');
const imageTitle = document.getElementById('imageTitle');
const addImageBtn = document.getElementById('addImageBtn');
const imageGallery = document.getElementById('imageGallery');

// Form Validation Functions
function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateSubject(subject) {
    return subject.trim().length >= 3;
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.style.display = 'none';
}

// Contact Form Validation
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    let isValid = true;
    
    // Clear previous errors
    hideError('nameError');
    hideError('emailError');
    hideError('subjectError');
    hideError('messageError');
    
    // Validate name
    if (!validateName(name)) {
        showError('nameError', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Validate email
    if (!validateEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    if (!validateSubject(subject)) {
        showError('subjectError', 'Subject must be at least 3 characters long');
        isValid = false;
    }
    
    // Validate message
    if (!validateMessage(message)) {
        showError('messageError', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    if (isValid) {
        alert('Form submitted successfully! Thank you for your message.');
        contactForm.reset();
    }
});

// To-Do List Functionality
let todoCounter = 0;

function createTodoItem(text) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.setAttribute('data-id', todoCounter++);
    
    li.innerHTML = `
        <span class="todo-text">${text}</span>
        <div class="todo-actions">
            <button class="complete-btn">Complete</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;
    
    // Add event listeners for the buttons
    const completeBtn = li.querySelector('.complete-btn');
    const deleteBtn = li.querySelector('.delete-btn');
    
    completeBtn.addEventListener('click', function() {
        li.classList.toggle('completed');
        completeBtn.textContent = li.classList.contains('completed') ? 'Undo' : 'Complete';
    });
    
    deleteBtn.addEventListener('click', function() {
        li.remove();
    });
    
    return li;
}

function addTodo() {
    const text = todoInput.value.trim();
    if (text === '') {
        alert('Please enter a task!');
        return;
    }
    
    const todoItem = createTodoItem(text);
    todoList.appendChild(todoItem);
    todoInput.value = '';
}

addTodoBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Image Gallery Functionality
let imageCounter = 0;

function createGalleryItem(url, title) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.setAttribute('data-id', imageCounter++);
    
    div.innerHTML = `
        <img src="${url}" alt="${title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4='">
        <div class="image-title">${title}</div>
        <button class="remove-btn" onclick="removeImage(this)">×</button>
    `;
    
    return div;
}

function addImage() {
    const url = imageUrl.value.trim();
    const title = imageTitle.value.trim();
    
    if (url === '') {
        alert('Please enter an image URL!');
        return;
    }
    
    if (title === '') {
        alert('Please enter an image title!');
        return;
    }
    
    // Basic URL validation
    try {
        new URL(url);
    } catch (e) {
        alert('Please enter a valid URL!');
        return;
    }
    
    const galleryItem = createGalleryItem(url, title);
    imageGallery.appendChild(galleryItem);
    
    // Clear inputs
    imageUrl.value = '';
    imageTitle.value = '';
}

function removeImage(button) {
    const galleryItem = button.closest('.gallery-item');
    galleryItem.remove();
}

// Make removeImage function globally available
window.removeImage = removeImage;

addImageBtn.addEventListener('click', addImage);

imageUrl.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addImage();
    }
});

imageTitle.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addImage();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some sample data for demonstration
document.addEventListener('DOMContentLoaded', function() {
    // Add sample todos
    const sampleTodos = [
        'Learn HTML and CSS',
        'Practice JavaScript',
        'Build responsive layouts',
        'Create interactive forms'
    ];
    
    sampleTodos.forEach(todo => {
        const todoItem = createTodoItem(todo);
        todoList.appendChild(todoItem);
    });
    
    // Add sample images
    const sampleImages = [
        {
            url: 'https://picsum.photos/300/200?random=1',
            title: 'Beautiful Landscape'
        },
        {
            url: 'https://picsum.photos/300/200?random=2',
            title: 'City Skyline'
        },
        {
            url: 'https://picsum.photos/300/200?random=3',
            title: 'Nature Scene'
        }
    ];
    
    sampleImages.forEach(img => {
        const galleryItem = createGalleryItem(img.url, img.title);
        imageGallery.appendChild(galleryItem);
    });
});
