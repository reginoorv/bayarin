function getItem(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        reportError(error);
        return null;
    }
}

function setItem(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        reportError(error);
    }
}

function removeItem(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        reportError(error);
    }
}

function clearStorage() {
    try {
        localStorage.clear();
    } catch (error) {
        reportError(error);
    }
}
