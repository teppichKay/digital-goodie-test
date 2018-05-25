var UserList = [];

// chars for generating random email
const emailChars = 'abcdefghijklmnopqrstuvwxyz1234567890';
// genderType for generating random gender
const genderTypes = ['female', 'male'];

const names = ['Vernon Wise', 'Lorraine Berry', 'Ervin Hines', 'Julian Phillips',
	'Elisa Craig', 'Marty Mann', 'Janis Walters', 'Rosalie Cain', 'Alexander Patton',
	'Jordan Ray', 'Madeline Garza', 'Cheryl Tate', 'Martha Schmidt', 'Gloria Freeman',
	'Dan Flores', 'Terence Williams', 'Philip Sherman', 'Courtney Luna', 'Rafael Warner',
	'Forrest Goodwin', 'Roderick Mason', 'Irma Wilkins', 'Alfonso Fleming', 
	'Juanita Reynolds','Patrick Kennedy', 'Marjorie Warren', 'Bradley Day', 'Molly Myers',
	'Don Hawkins', 'Wilson Luna'];

for (var i = 0; i < 30; i++) {
	// generate a random email string
	var emailString = '';
	
	for(var ii=0; ii<5; ii++){
    emailString += emailChars[Math.floor(Math.random() * emailChars.length)];
	};

	var userModel = {
		id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10),
		name: names[i],
		age: Math.floor(Math.random() * 120 + 10),
		gender: genderTypes[Math.floor(2 * Math.random())],
		email: emailString + '@domain.com',
		phone: Math.floor(Math.random() * 900000000) + 100000000
	}
	UserList.push(userModel);
}

module.exports = UserList;