Module.register("compliments", {
    defaults: {
        data: []
    },

    start: function() {
        this.sendSocketNotification("INIT", {});
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        var table = document.createElement("table");

        // Create header row
        var headerRow = document.createElement("tr");
        var dateHeader = document.createElement("th");
        var callsHeader = document.createElement("th");
        var prospectsHeader = document.createElement("th");
        dateHeader.innerHTML = "Date";
        callsHeader.innerHTML = "Cold Calls";
        prospectsHeader.innerHTML = "Prospects Gathered";
        headerRow.appendChild(dateHeader);
        headerRow.appendChild(callsHeader);
        headerRow.appendChild(prospectsHeader);
        table.appendChild(headerRow);  // Append header row to table

        // Ensure this.config.data is defined and an array
        if (!Array.isArray(this.config.data)) {
            this.config.data = [];
        }

        // Create data rows
        this.config.data.forEach(entry => {
            var row = document.createElement("tr");
            var dateCell = document.createElement("td");
            var callsCell = document.createElement("td");
            var prospectsCell = document.createElement("td");
            dateCell.innerHTML = entry.date;
            callsCell.innerHTML = entry.calls;
            prospectsCell.innerHTML = entry.prospects;
            row.appendChild(dateCell);
            row.appendChild(callsCell);
            row.appendChild(prospectsCell);
            table.appendChild(row);
        });

        wrapper.appendChild(table);
        return wrapper;
    },

    socketNotificationReceived: function(notification, payload) {
        console.log("Received socket notification:", notification, "with payload:", payload);  // Add this line
        if (notification === "UPDATE_DATA" && payload && Array.isArray(payload.data)) {
            this.config.data = payload.data;
            this.updateDom();
        }
    }
});
