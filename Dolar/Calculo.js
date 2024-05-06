
function loadDollarValues() {
    // Definir un objeto que contenga los nombres de cada tipo de dólar
    const dollarNames = {
        official: "Dólar Oficial",
        blue: "Dólar Blue",
        crypto: "Dólar Cripto"
    };

    // URL de la API para obtener los valores de cada tipo de dólar
    const apiUrl = {
        official: "https://dolarapi.com/v1/dolares/oficial",
        blue: "https://dolarapi.com/v1/dolares/blue",
        crypto: "https://dolarapi.com/v1/dolares/cripto"
    };

    // Obtener los valores de cada tipo de dólar
    Object.keys(apiUrl).forEach(currency => {
        $.ajax({
            url: apiUrl[currency],
            type: "GET",
            dataType: "json",
            success: function(data) {
                let dollarValue;

                if (data && Array.isArray(data)) {
                    if (data.length > 0 && data[0].venta) {
                        dollarValue = parseFloat(data[0].venta);
                    } else if (data.length > 0 && data[0].value) {
                        dollarValue = parseFloat(data[0].value);
                    }
                } else if (data && data.venta) {
                    dollarValue = parseFloat(data.venta);
                } else if (data && data.value) {
                    dollarValue = parseFloat(data.value);
                }

                if (!isNaN(dollarValue)) {
                    // Mostrar el nombre y el valor al lado del checkbox correspondiente
                    $(`#${currency}-checkbox`).next().text(`${dollarNames[currency]} ($${dollarValue.toFixed(2)})`);
                }
            },
            error: function(xhr, status, error) {
                console.error("Error al obtener los datos:", error);
            }
        });
    });
}

// Llamar a la función para cargar los valores al cargar la página
$(document).ready(function() {
    loadDollarValues();
});






function calculate() {
    const officialChecked = document.getElementById("official-checkbox").checked;
    const blueChecked = document.getElementById("blue-checkbox").checked;
    const cryptoChecked = document.getElementById("crypto-checkbox").checked;
    const amount = parseFloat(document.getElementById("amount-input").value);

    const apiUrl = {
        official: "https://dolarapi.com/v1/dolares/oficial",
        blue: "https://dolarapi.com/v1/dolares/blue",
        crypto: "https://dolarapi.com/v1/dolares/cripto"
    };
    let currencies = [];

    if (officialChecked) {
        currencies.push("official");
    }
    if (blueChecked) {
        currencies.push("blue");
    }
    if (cryptoChecked) {
        currencies.push("crypto");
    }

    if (currencies.length === 0) {
        console.error("Debe seleccionar al menos una opción de dólar.");
        return;
    }

    currencies.forEach(currency => {
        $.ajax({
            url: apiUrl[currency],
            type: "GET",
            dataType: "json",
            success: function(data) {
                let dollarValue;

                if (Array.isArray(data) && data.length > 0) {
                    if (data[0].venta) {
                        dollarValue = parseFloat(data[0].venta);
                    } else if (data[0].value) {
                        dollarValue = parseFloat(data[0].value);
                    }
                } else if (data && data.venta) {
                    dollarValue = parseFloat(data.venta);
                } else if (data && data.value) {
                    dollarValue = parseFloat(data.value);
                }

                if (isNaN(dollarValue)) {
                    console.error("No se pudo obtener el valor del dólar.");
                    return;
                }

                const dollars = amount / dollarValue;
                $("#result").text(`Tienes aproximadamente $${dollars.toFixed(2)} dólares (${currency})`);
            },
            error: function(xhr, status, error) {
                console.error("Error al obtener los datos:", error);
            }
        });
    });
}
