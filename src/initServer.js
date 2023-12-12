//TODO : Identify a better way to seed the database
function initServer() {
    if(typeof window === 'undefined') return;
    console.log("initServer");
    // Check if the seeding has been initialized
    if (!window.localStorage.getItem('serverInitialized')) {
        localStorage.setItem('serverInitialized', 'true');
        fetch('/api/init', { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                console.log(data.message); // "Seeding process initiated"

            })
            .catch(error => console.error('Error triggering seeding:', error));
    }
}

export default initServer;
