// Settings
var settings = {
	"metric": true,
	"length": true,
	"mass": true,
	"volume": true,
	"temperature": true,
	"speed": true,
	"decimalPlaces": 2
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
// Decimal places
var decimalPlaces = document.getElementById("decimalplaces");

// Set the initial checkbox states
chrome.storage.sync.get('settings', function(response) {
	for (var key in response.settings) {
		settings[key] = response.settings[key];
		if (key !== "decimalPlaces") {
			checkbox[key].checked = response.settings[key];
		}
	}
	decimalPlaces.value = response.settings["decimalPlaces"];
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

// Set the decimal places
decimalPlaces.onkeyup = function() {
	if (this.value > 20) {
		this.value = 20;
	}
	if (this.value < 0) {
		this.value = 0;
	}
	settings["decimalPlaces"] = this.value;
	chrome.storage.sync.set({'settings': settings}, function() {});
};
