// Settings
var settings = {
	"metric": true,
	"length": true,
	"mass": true,
	"volume": true,
	"temperature": true,
	"speed": true
}
// Checkboxes
var checkbox = {
	"metric": document.getElementById("systemCheckbox"),
	"length": document.getElementById("length"),
	"mass": document.getElementById("mass"),
	"volume": document.getElementById("volume"),
	"temperature": document.getElementById("temperature"),
	"speed": document.getElementById("speed")
}
// Set the initial checkbox states and settings
chrome.storage.sync.get('settings', function(response) {
	for (var key in response.settings) {
		settings[key] = response.settings[key];
		checkbox[key].checked = response.settings[key];
	}
});

// When the checkboxes change, set the settings accordingly
checkbox["metric"].onchange = function() {
	if(this.checked) {
		settings["metric"] = true;
		chrome.storage.sync.set({'settings': settings}, function() {
			console.log("check");
		});
	}
	if(!this.checked) {
		settings["metric"] = false;
		chrome.storage.sync.set({'settings': settings}, function() {
			console.log("uncheck");
		});
	}
};

checkbox["length"].onchange = function() {
	if(this.checked) {
		settings["length"] = true;
		chrome.storage.sync.set({'settings': settings}, function() {});
	}
	if(!this.checked) {
		settings["length"] = false;
		chrome.storage.sync.set({'settings': settings}, function() {});
	}
};

checkbox["mass"].onchange = function() {
	if(this.checked) {
		settings["mass"] = true;
		chrome.storage.sync.set({'settings': settings}, function() {});
	}
	if(!this.checked) {
		settings["mass"] = false;
		chrome.storage.sync.set({'settings': settings}, function() {});
	}
};

checkbox["volume"].onchange = function() {
	if(this.checked) {
		settings["volume"] = true;
		chrome.storage.sync.set({'settings': settings}, function() {});
	}
	if(!this.checked) {
		settings["volume"] = false;
		chrome.storage.sync.set({'settings': settings}, function() {});
	}
};

checkbox["temperature"].onchange = function() {
	if(this.checked) {
		settings["temperature"] = true;
		chrome.storage.sync.set({'settings': settings}, function() {});
	}
	if(!this.checked) {
		settings["temperature"] = false;
		chrome.storage.sync.set({'settings': settings}, function() {});
	}
};

checkbox["speed"].onchange = function() {
	if(this.checked) {
		settings["speed"] = true;
		chrome.storage.sync.set({'settings': settings}, function() {});
	}
	if(!this.checked) {
		settings["speed"] = false;
		chrome.storage.sync.set({'settings': settings}, function() {});
	}
};