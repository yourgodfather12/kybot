function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regex.test(email);
}

function formatCurrency(value) {
    return `$${parseFloat(value).toFixed(2)}`;
}

module.exports = { isValidEmail, formatCurrency };
