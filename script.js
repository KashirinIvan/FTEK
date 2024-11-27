const cargoList = [
    {
        id: "CARGO001",
        name: "Строительные материалы",
        status: "В пути",
        origin: "Москва",
        destination: "Казань",
        departureDate: "2024-11-24"
    },
    {
        id: "CARGO002",
        name: "Хрупкий груз",
        status: "Ожидает отправки",
        origin: "Санкт-Петербург",
        destination: "Екатеринбург",
        departureDate: "2024-11-26"
    }
];
document.addEventListener("DOMContentLoaded", function(){
    /*функция сортировки по выбраному статусу */
    function selectedFilter(cargo) {
        let statusId = document.querySelector('#statusId')
        if (statusId.value === cargo.status || statusId.value === "Все статусы") {
            return cargo;
        }
    }
    /*сортировка по условию статуса*/
    document.querySelector('#statusId').addEventListener('change', function (e) {
        updateCargoList(cargoList.filter(selectedFilter))
    })
    /*добавление груза */
    document.querySelector('#add-new-cargo-button').addEventListener('click', function (e) {
        let cargo = {};
        cargo.id = "CARGO" + String(cargoList.length + 1).padStart(3, '0');
        let name = document.getElementById('name').value;
        if (name !== '') {
            cargo.name = name;
        } else {
            alert("Вы не ввели название груза");
            return;
        }
        cargo.status = "Ожидает отправки";
        let origin = document.getElementById('origin').value;
        if (origin !== '') {
            cargo.origin = origin;
        } else {
            alert("Вы не ввели название пункта отправления");
            return;
        }
        let destination = document.getElementById('destination').value
        if (destination !== '') {
            cargo.destination = destination;
        } else {
            alert("Вы не ввели название пункта назначения");
            return;
        }
        let departureDate = document.getElementById('departureDate').value;
        if (departureDate !== '') {
            cargo.departureDate = departureDate;
        } else {
            alert("Вы не ввели дату отправления");
            return;
        }
        cargoList.push(cargo)
        updateCargoList(cargoList.filter(selectedFilter))
    })
    /*Создание и заполение информацией о грузе */
    function createCargo(cargo, trCargo) {
        let cargoTemplate = document.getElementById('cargoTemplate').content.cloneNode(true);
        cargoTemplate.querySelector('.idCargoTemplate').innerText = cargo.id;
        cargoTemplate.querySelector('.nameTemplate').innerText = cargo.name;
        cargoTemplate.querySelector('#statusIdTemplate').value = cargo.status;
        if (cargo.status === "В пути") {
            cargoTemplate.querySelector('#statusIdTemplate').style.backgroundColor = "blue"
        }
        if (cargo.status === "Ожидает отправки") {
            cargoTemplate.querySelector('#statusIdTemplate').style.backgroundColor = "yellow"
        }
        if (cargo.status === "Доставлен") {
            cargoTemplate.querySelector('#statusIdTemplate').style.backgroundColor = "green"
        }
        cargoTemplate.querySelector('.statusTemplate').addEventListener('change', function (e) {
            if (e.target.value === 'Доставлен') {
                var date = new Date();
                if (String(date.getFullYear()) >= e.target.parentNode.parentNode.parentNode.children[5].textContent.slice(0, 4) &&
                    String(date.getMonth() + 1) >= e.target.parentNode.parentNode.parentNode.children[5].textContent.slice(5, 7) &&
                    String(date.getDate()) >= e.target.parentNode.parentNode.parentNode.children[5].textContent.slice(8, 10)) {
                    cargoList.find(cargo => cargo.id === e.target.parentNode.parentNode.parentNode.children[0].textContent).status = e.target.value
                    e.target.style.backgroundColor = "green"
                } else {
                    alert("Груз не может быть доставлен при плановой отправке " + e.target.parentNode.parentNode.parentNode.children[5].textContent)
                    updateCargoList(cargoList)
                    return;
                }
            } else {
                cargoList.find(cargo => cargo.id === e.target.parentNode.parentNode.parentNode.children[0].textContent).status = e.target.value
                if (e.target.value === "В пути") {
                    e.target.style.backgroundColor = "blue"
                }
                if (e.target.value === "Ожидает отправки") {
                    e.target.style.backgroundColor = "yellow"
                }
            }

        })
        cargoTemplate.querySelector('.originTemplate').innerText = cargo.origin;
        cargoTemplate.querySelector('.destinationTemplate').innerText = cargo.destination;
        cargoTemplate.querySelector('.departureDateTemplate').innerText = cargo.departureDate;
        trCargo.appendChild(cargoTemplate)
    }

    /*Создание и заполение всего списка */
    function updateCargoList(cargoList) {
        let cagroTBody = document.querySelector('#cargo');
        cagroTBody.innerHTML = '';
        for (let cargo of cargoList) {
            let trCargo = document.createElement('tr');
            cagroTBody.appendChild(trCargo);
            createCargo(cargo, trCargo)
        }
    }
    updateCargoList(cargoList)
});