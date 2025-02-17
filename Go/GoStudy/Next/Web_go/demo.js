fetch('http://localhost:8000/submit', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: 'JohnDoe',
    }),
});
