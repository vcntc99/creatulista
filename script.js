document.addEventListener('DOMContentLoaded', () => {
    fetch('records.txt')
        .then(response => response.text())
        .then(data => {
            const records = data.split(/\r?\n/).filter(record => record.trim() !== '');
            displayRecords(records);
        })
        .catch(error => console.error('Error fetching records:', error));
});

function displayRecords(records) {
    const container = document.getElementById('record-container');
    container.innerHTML = ''; // Limpiar contenedor

    records.forEach((record, index) => {
        const recordItem = document.createElement('div');
        recordItem.classList.add('record-item');

        const recordInput = document.createElement('input');
        recordInput.type = 'number';
        recordInput.min = 1;
        recordInput.max = records.length;
        recordInput.value = index + 1;

        const recordLabel = document.createElement('span');
        recordLabel.textContent = record;

        recordItem.appendChild(recordInput);
        recordItem.appendChild(recordLabel);
        container.appendChild(recordItem);
    });
}

function sortRecords() {
    const recordItems = Array.from(document.getElementsByClassName('record-item'));
    const sortedItems = recordItems.sort((a, b) => {
        const aValue = parseInt(a.querySelector('input').value, 10);
        const bValue = parseInt(b.querySelector('input').value, 10);
        return aValue - bValue;
    });

    const container = document.getElementById('record-container');
    container.innerHTML = ''; // Limpiar contenedor

    sortedItems.forEach(item => {
        container.appendChild(item);
    });
}