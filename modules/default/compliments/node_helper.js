
console.log("lol")
var NodeHelper = require("node_helper");
var fs = require("fs");
var path = require("path");

module.exports = NodeHelper.create({
    start: async function() {
        this.dataFile = path.join(__dirname, "data.json");
        if (fs.existsSync(this.dataFile)) {
            try {
                let fileContent = await fs.promises.readFile(this.dataFile, 'utf8');
                this.data = JSON.parse(fileContent);
            } catch (error) {
                console.error("Error reading data file:", error);
            }
        } else {
            this.data = [
                { date: "2023-09-20", calls: 10, prospects: 3 },
                { date: "2023-09-21", calls: 8, prospects: 2 },
                // ... more dummy data
            ];
        }
        this.scheduleReset();
    },

    scheduleReset: function() {
        console.log('Scheduling reset...');
        var now = new Date();
        var resetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 4, 0, 0, 0);  // 6am GMT+2 is 4am UTC
        if (now >= resetTime) {
            resetTime.setDate(resetTime.getDate() + 1);
        }
        var timeout = resetTime - now;
        setTimeout(this.resetData.bind(this), timeout);
    },

    resetData: function() {
        console.log('Resetting data...');
        this.data.push({ date: new Date().toISOString().split("T")[0], calls: 0, prospects: 0 });
        if (this.data.length > 14) {
            this.data.shift();
        }
        this.saveData();
        this.scheduleReset();
    },

    saveData: function() {
        try {
            fs.writeFileSync(this.dataFile, JSON.stringify(this.data));
        } catch (error) {
            console.error('Error writing to data.json:', error);
        }
    },

    socketNotificationReceived: function(notification, payload) {
        console.log("Received socket notification:", notification, "with payload:", payload);
        if (notification === "INIT") {
            console.log("Sending UPDATE_DATA notification with data:", this.data);
            this.sendSocketNotification("UPDATE_DATA", { data: this.data });
        }
    }
});
