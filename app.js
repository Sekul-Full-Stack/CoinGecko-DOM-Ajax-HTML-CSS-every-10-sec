function fetchCryptoData() {
  const xhr = new XMLHttpRequest();
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

  xhr.open('GET', url, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      updateTable(data);
    } else {
      console.error('Failed to fetch data', xhr.status);
    }
  };
  xhr.send();
}

function updateTable(data) {
  const tableBody = document.querySelector('#crypto-table tbody');
  tableBody.innerHTML = '';  

  data.forEach((coin, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${coin.name}</td>
      <td>${coin.symbol.toUpperCase()}</td>
      <td>$${coin.current_price.toLocaleString()}</td>
      <td style="color: ${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'};">
        ${coin.price_change_percentage_24h.toFixed(2)}%
      </td>
    `;

    tableBody.appendChild(row);
  });
}
 
fetchCryptoData();
 
setInterval(fetchCryptoData, 10000);
