const localStorageKey = 'to-do-list-gn';

function validateIfExistsNewTask() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let inputValue = document.getElementById('input-new-task').value;
    let exists = values.find(x => x.name === inputValue);
    return exists ? true : false;
}

function newTask() {
    let inputTask = document.getElementById('input-new-task');
    let inputDate = document.getElementById('input-date');
    inputTask.style.border = '';
    inputDate.style.border = '';

    // Validation
    if (!inputTask.value) {
        inputTask.style.border = '1px solid red';
        alert('Digite algo para inserir em sua lista');
        return;
    }
    if (!inputDate.value) {
        inputDate.style.border = '1px solid red';
        alert('Selecione uma data válida');
        return;
    }
    if (validateIfExistsNewTask()) {
        alert('Já existe uma task com essa descrição');
        return;
    }

    // Parse the selected date to ensure it respects local timezone
    let selectedDate = new Date(inputDate.value + 'T00:00:00'); // Forces local timezone

    // Increment to localStorage
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    values.push({
        name: inputTask.value,
        date: selectedDate.toLocaleDateString(), // Save in local date format
    });
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();

    // Clear inputs
    inputTask.value = '';
    inputDate.value = '';
}

function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let list = document.getElementById('to-do-list');
    list.innerHTML = '';
    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `<li>${values[i]['name']} - <strong>${values[i]['date']}</strong>
            <button id='btn-ok' onclick='removeItem("${values[i]['name']}")'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                </svg>
            </button>
        </li>`;
    }
}

function removeItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = values.findIndex(x => x.name === data);
    values.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
}

showValues();
