document.getElementById('sortByView').addEventListener('click', function () {
    const cardContainer = document.getElementById('cardContainer');
    const cardElements = cardContainer.getElementsByClassName('card');

    const cardArray = [];
    for (let i = 0; i < cardElements.length; i++) {
        cardArray.push(cardElements[i]);
    }

    for (let i = 0; i < cardArray.length - 1; i++) {
        for (let j = i + 1; j < cardArray.length; j++) {
            const viewsA = parseInt(cardArray[i].querySelector('.viewsText').textContent);
            const viewsB = parseInt(cardArray[j].querySelector('.viewsText').textContent);

            if (!isNaN(viewsA) && !isNaN(viewsB) && viewsB > viewsA) {
                [cardArray[i], cardArray[j]] = [cardArray[j], cardArray[i]];
            }
        }
    }
    cardContainer.innerHTML = '';
    cardArray.forEach(card => cardContainer.appendChild(card));
});
