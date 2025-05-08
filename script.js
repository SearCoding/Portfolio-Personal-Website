document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
        });
    });
});

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        fullName: document.querySelector('input[name="fullName"]').value,
        email: document.querySelector('input[name="email"]').value,
        phone: document.querySelector('input[name="phone"]').value,
        subject: document.querySelector('input[name="subject"]').value,
        message: document.querySelector('textarea[name="message"]').value
    };

    try {
        const response = await fetch('http://localhost:3000/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
            window.location.href = '/contact.html';
        } else {
            alert(result.message);
            window.location.href = '/contact.html';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong.');
    }
});

