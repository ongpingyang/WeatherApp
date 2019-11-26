var historyForm = true;

function toggleForm() {
    if (historyForm) {
        historyForm = !historyForm;
        openForm();
    } else {
        historyForm = !historyForm;
        closeForm();
    }
}

function openForm() {
    document.getElementById("historyForm").style.display = "block";
}
  
function closeForm() {
    document.getElementById("historyForm").style.display = "none";
}

function saveData() {
    newWeatherApp.save((error) => {
        if(error) {
            console.log('Ooops, something happened');
        } else {
            console.log('Data has been saved!')
        }
    })
}

function deleteData() {
    newWeatherApp.deleteMany((error) => {
        if(error) {
            console.log('Ooops, something happened');
        } else {
            console.log('Data has been deleted!')
        }
    })
}