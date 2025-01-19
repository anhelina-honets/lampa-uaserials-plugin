// Назва плагіну: UASerials Plugin

Lampa.Plugins.add('uaserials', {
    name: 'UASerials Plugin',
    description: 'Інтеграція з сайтом uaserials.pro для перегляду серіалів',
    
    init: function() {
        console.log('UASerials Plugin активовано');
        this.createSearchUI();  // Створення інтерфейсу для пошуку
    },

    createSearchUI: function() {
        var container = document.createElement('div');
        container.classList.add('search-container');
        
        var input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Пошук серіалу...';
        input.classList.add('search-input');
        
        var button = document.createElement('button');
        button.innerText = 'Пошук';
        button.classList.add('search-button');
        
        button.onclick = () => this.getSeries(input.value);
        
        container.appendChild(input);
        container.appendChild(button);
        
        document.body.appendChild(container);
    },

    getSeries: function(query) {
        var url = 'https://uaserials.pro/search/' + encodeURIComponent(query);
        fetch(url)
            .then(response => response.text())
            .then(data => {
                var seriesList = this.parseSeries(data);
                this.displaySeries(seriesList);
            })
            .catch(error => console.error('Помилка при отриманні серіалів: ', error));
    },

    parseSeries: function(htmlData) {
        var series = [];
        var parser = new DOMParser();
        var doc = parser.parseFromString(htmlData, 'text/html');
        var elements = doc.querySelectorAll('.series-item');
        elements.forEach(function(item) {
            var title = item.querySelector('.title').textContent;
            var link = item.querySelector('a').href;
            series.push({ title: title, link: link });
        });
        return series;
    },

    displaySeries: function(seriesList) {
        var container = document.createElement('div');
        container.classList.add('series-list');
        seriesList.forEach(function(series) {
            var seriesElement = document.createElement('div');
            seriesElement.classList.add('series-item');
            seriesElement.innerHTML = `<a href="${series.link}" target="_blank">${series.title}</a>`;
            container.appendChild(seriesElement);
        });
        document.body.appendChild(container);
    }
});

Lampa.Plugins.load('uaserials');