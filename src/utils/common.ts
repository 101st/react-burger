export const checkResponse = (response: Response) => {
    if (response?.status === 401) window.location.replace('/login');
    if (response.ok) {
        return response.json();
    }
    throw new Error(`Ошибка запроса к серверу. Код ${response?.status}`);
}