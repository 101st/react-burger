export const checkResponse = (response) => {
    if (response.ok) {
        return response.json();
    }
    throw new Error(`Ошибка запроса к серверу. Код ${response?.status}`);
}