document.addEventListener("DOMContentLoaded", () => {
    const mapElement = document.getElementById("route-map");
    if (!mapElement) return;

    // Initialize Leaflet map
    const map = L.map("route-map").setView([40.7128, -74.0060], 12); // Default to NYC
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    let waypoints = [];
    const markers = [];
    const routeForm = document.getElementById('routeForm');
    const waypointsInput = document.getElementById('waypointsInput');
    const waypointsList = document.getElementById('waypointsList');

    map.on("click", (e) => {
        addWaypoint(e.latlng);
    });

    function addWaypoint(latlng) {
        if (waypoints.length >= 10) {
            alert("Maximum of 10 waypoints allowed.");
            return;
        }

        const waypoint = { lat: latlng.lat, lng: latlng.lng };
        waypoints.push(waypoint);

        const marker = L.marker(latlng, {
            draggable: true,
            icon: createWaypointIcon(waypoints.length),
        }).addTo(map);
        
        marker.on('dragend', updateWaypoints);
        markers.push(marker);

        updateWaypoints();
    }
    
    function createWaypointIcon(number) {
        return L.divIcon({
            className: 'waypoint-icon',
            html: `<b>${number}</b>`,
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        });
    }

    function updateWaypoints() {
        // Update the internal waypoints array based on marker positions
        waypoints = markers.map(marker => {
            const latlng = marker.getLatLng();
            return { lat: latlng.lat, lng: latlng.lng };
        });
        
        // Update the hidden form input
        waypointsInput.value = JSON.stringify(waypoints);
        
        // Update the visual list of waypoints
        renderWaypointsList();

        // Enable/disable form submission
        document.getElementById('saveRouteBtn').disabled = waypoints.length < 2;
    }

    function renderWaypointsList() {
        waypointsList.innerHTML = '';
        if (waypoints.length === 0) {
            waypointsList.innerHTML = '<li class="list-group-item">Click on the map to add waypoints.</li>';
            return;
        }

        waypoints.forEach((wp, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <span>Waypoint ${index + 1}: ${wp.lat.toFixed(4)}, ${wp.lng.toFixed(4)}</span>
                <button type="button" class="btn btn-sm btn-danger remove-wp-btn" data-index="${index}">×</button>
            `;
            waypointsList.appendChild(li);
        });
    }
    
    waypointsList.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('remove-wp-btn')) {
            const index = parseInt(e.target.getAttribute('data-index'), 10);
            
            // Remove from map and arrays
            map.removeLayer(markers[index]);
            markers.splice(index, 1);
            
            // Re-update everything
            updateWaypoints();
        }
    });

    // Initial render
    renderWaypointsList();
});