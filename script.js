document.addEventListener('DOMContentLoaded', () => {
    fetch('records.txt')
        .then(response => response.text())
        .then(data => {
            const lines = data.split(/\r?\n/).filter(line => line.trim() !== '');
            const headers = lines[0].split(',');
            const records = lines.slice(1);

            displayHeaders(headers);
            displayRecords(records);
        })
        .catch(error => console.error('Error fetching records:', error));
});

function displayHeaders(headers) {
    const container = document.getElementById('header-container');
    container.innerHTML = ''; // Limpiar contenedor

    const headerItem = document.createElement('div');
    headerItem.classList.add('header-item');

    headers.forEach(header => {
        const headerLabel = document.createElement('span');
        headerLabel.textContent = header;
        headerItem.appendChild(headerLabel);
    });

    container.appendChild(headerItem);
}

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

        const fields = record.split(',');
        fields.forEach(field => {
            const recordLabel = document.createElement('span');
            recordLabel.textContent = field;
            recordItem.appendChild(recordLabel);
        });

        recordItem.appendChild(recordInput);
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