document.addEventListener('DOMContentLoaded', () => {
    fetch('names.txt')
        .then(response => response.text())
        .then(data => {
            const names = data.split(/\r?\n/).filter(name => name.trim() !== '');
            displayNames(names);
        })
        .catch(error => console.error('Error fetching names:', error));
});

function displayNames(names) {
    const container = document.getElementById('name-container');
    container.innerHTML = ''; // Limpiar contenedor

    names.forEach((name, index) => {
        const nameItem = document.createElement('div');
        nameItem.classList.add('name-item');
        
        const nameLabel = document.createElement('span');
        nameLabel.textContent = name;

        const nameInput = document.createElement('input');
        nameInput.type = 'number';
        nameInput.min = 1;
        nameInput.max = names.length;
        nameInput.value = index + 1;

        nameItem.appendChild(nameLabel);
        nameItem.appendChild(nameInput);
        container.appendChild(nameItem);
    });
}

function sortNames() {
    const nameItems = Array.from(document.getElementsByClassName('name-item'));
    const sortedItems = nameItems.sort((a, b) => {
        const aValue = parseInt(a.querySelector('input').value, 10);
        const bValue = parseInt(b.querySelector('input').value, 10);
        return aValue - bValue;
    });

    const container = document.getElementById('name-container');
    container.innerHTML = ''; // Limpiar contenedor

    sortedItems.forEach(item => {
        container.appendChild(item);
    });
}
