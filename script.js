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
    const headerRow = document.getElementById('header-row');
    headerRow.innerHTML = ''; // Limpiar fila de encabezados

    const emptyHeader = document.createElement('th');
    headerRow.appendChild(emptyHeader);

    headers.forEach(header => {
        const headerCell = document.createElement('th');
        headerCell.textContent = header;
        headerRow.appendChild(headerCell);
    });
}

function displayRecords(records) {
    const tbody = document.getElementById('record-body');
    tbody.innerHTML = ''; // Limpiar cuerpo de la tabla

    records.forEach((record, index) => {
        const row = document.createElement('tr');

        const cellInput = document.createElement('td');
        const recordInput = document.createElement('input');
        recordInput.type = 'number';
        recordInput.min = 1;
        recordInput.max = records.length;
        recordInput.value = index + 1;
        cellInput.appendChild(recordInput);
        row.appendChild(cellInput);

        const fields = record.split(',');
        fields.forEach(field => {
            const cell = document.createElement('td');
            cell.textContent = field;
            row.appendChild(cell);
        });

        tbody.appendChild(row);
    });
}

function sortRecords() {
    const rows = Array.from(document.querySelectorAll('#record-body tr'));
    const sortedRows = rows.sort((a, b) => {
        const aValue = parseInt(a.querySelector('input').value, 10);
        const bValue = parseInt(b.querySelector('input').value, 10);
        return aValue - bValue;
    });

    const tbody = document.getElementById('record-body');
    tbody.innerHTML = ''; // Limpiar cuerpo de la tabla

    sortedRows.forEach(row => {
        tbody.appendChild(row);
    });
}
