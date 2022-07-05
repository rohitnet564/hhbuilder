// your code goes here ...
var currentId = 1;
var householdList = [];

function removeFromList() {
	var currElement = document.getElementById(this.id);
	document.querySelector('.household').removeChild(currElement);
	const idxFromList = householdList.findIndex(ele => ele.id === this.id)
	if (idxFromList > -1) {
		householdList.splice(idxFromList, 1);
	}
	document.querySelector('.debug').style.display = 'none';
};

function resetForm() {
	document.forms[0].reset();
	document.querySelector('.debug').style.display = 'none';
}

document.querySelector('.add').addEventListener('click', function(event) {
	event.preventDefault();
	var age = document.getElementById('age').value;
	var parsedAge = parseInt(age);
	var relationship = document.getElementById('rel').value;
	var isSmoker = document.getElementById('smoker').checked;
	var isValidFill = true;
	if (!age) {
		alert('Please fill in the age');
		isValidFill = false;
	} else if(isNaN(parsedAge)) {
		alert('Age must be a number');
		isValidFill = false;
	} else if (parsedAge < 1) {
		alert('Age must be a greater than 0');
		isValidFill = false;
	}
	if (!relationship) {
		alert('Please fill in the relationship option');
		isValidFill = false;
	}

	if (isValidFill) {
		householdList.push({
			age: parsedAge,
			relationship: relationship,
			smoker: isSmoker,
			id: currentId
		});
		var node = document.createElement("li");
		node.id = currentId;
		var textnode = document.createTextNode("Age: " + parsedAge + ", Relationship:" + relationship + " isSmoker:" + (isSmoker ? 'Yes' : 'No'));
		node.appendChild(textnode);
		var removeBtn = document.createElement("button");
		removeBtn.innerHTML = 'Remove';
		removeBtn.className = 'remove-button';
		removeBtn.dataset = currentId;
		removeBtn.onclick = removeFromList.bind({
			id: currentId
		});
		node.appendChild(removeBtn);
		document.querySelector('.household').appendChild(node);
		currentId++;
		resetForm();
	}
});

document.forms[0].onsubmit = function() {
	event.preventDefault();
	var payload = JSON.stringify({
		data: householdList
	}, null, 2);
	document.querySelector('.debug').innerHTML = payload;
	document.querySelector('.debug').style.display = 'block';
	debugger;
}