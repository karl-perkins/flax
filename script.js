const wellbeingStarArray = [];
const servicesArray = [];
const workReadinessOutcomesArray = [];
const employmentOutcomesArray = [];

function createCase() {

}

function createEnrolment() {
	
}

function createWellbeingStar(formData) {
	const dateCompleted = formData.get('dateCompleted');
	const lifestyle = Number(formData.get('lifestyle'));
	const lookingAfterYourself = Number(formData.get('lookingAfterYourself'));
	const managingSymptoms = Number(formData.get('managingSymptoms'));
	const workVolunteeringOther = Number(formData.get('workVolunteeringOther'));
	const money = Number(formData.get('money'));
	const whereYouLive = Number(formData.get('whereYouLive'));
	const familyAndFriends = Number(formData.get('familyAndFriends'));
	const feelingPositive = Number(formData.get('feelingPositive'));
	const total = lifestyle + lookingAfterYourself + managingSymptoms + workVolunteeringOther + money + whereYouLive + familyAndFriends + feelingPositive;

	return {
		dateCompleted,
		total,
		lifestyle,
		lookingAfterYourself,
		managingSymptoms,
		workVolunteeringOther,
		money,
		whereYouLive,
		familyAndFriends,
		feelingPositive,
	};
}

function createService(formData) {
	const dateServiceAccessed = formData.get('dateServiceAccessed');
	const serviceType = formData.get('serviceType')
	const serviceTypeDesc = serviceTypes[serviceType];

	return { dateServiceAccessed, serviceTypeDesc };
}

function createWorkReadinessOutcome(formData) {
	const outcome = formData.get('outcome');
	const outcomeDesc = workReadinessOutcomes[outcome];
	const startDate = formData.get('startDate');
	return { outcomeDesc, startDate };
}

function createEmploymentOutcome(formData) {
	const outcome = formData.get('outcome');
	const outcomeDesc = employmentOutcomes[outcome];
	const hoursPerWeek = formData.get('hoursPerWeek');
	const startDate = formData.get('startDate');
	const endDate = formData.get('endDate');
	return { outcomeDesc, hoursPerWeek, startDate, endDate };
}

function createRows(tableBody, objArr) {
	tableBody.innerHTML = '';

	objArr.forEach((obj) => {
		const row = tableBody.insertRow();

		for (const prop in obj) {
			row.insertCell().textContent = obj[prop];
		}
	});
}

function submitForm(form, createObjFn, objArr, tableBody, dialog) {
	const formData = new FormData(form);
	objArr.push(createObjFn(formData));
	createRows(tableBody, objArr);
	form.reset();
	dialog.close();
}

function createSection(id, createObjFn, objArr) {
	return { id, createObjFn, objArr };
}

const sections = [];

sections.push(
	createSection('#wellbeing-star', createWellbeingStar, wellbeingStarArray)
);
sections.push(createSection('#services', createService, servicesArray));
sections.push(
	createSection(
		'#work-readiness-outcomes',
		createWorkReadinessOutcome,
		workReadinessOutcomesArray
	)
);
sections.push(
	createSection(
		'#employment-outcomes',
		createEmploymentOutcome,
		employmentOutcomesArray
	)
);

sections.forEach((section) => {
	const root = document.querySelector(section.id);
	const dialog = root.querySelector('dialog');
	const showDialogButton = root.querySelector('dialog + button');
	const form = root.querySelector('form');
	const tableBody = root.querySelector('tbody');

	showDialogButton.addEventListener('click', () => dialog.showModal());

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		submitForm(
			form,
			section.createObjFn, //how make this dynamic?
			section.objArr,
			tableBody,
			dialog
		);
	});
});

//
// Populate Options
//
const serviceArms = [
	'Standard',
	'Responding Early'
]

const caseStatus = [
	'Awaiting Enrolment',
	'Did Not Proceed',
	'Active',
	'In Post-Placement Support',
	'Exited Service',
	'Transfer to Standard Service Arm',
]

const serviceTypes = [
	'AOD/Addiction Support Services',
	'Career Advice/Exploration',
	'Counselling/Life Coaching',
	'Government Agencies/Public Services',
	'Healthy Lifestyle Services',
	'In-practice GP Services',
	'Job Search Services',
	'Navigation Services',
	'NGO Mental Health Services',
	'Physical Health Services',
	'Primary Mental Health Services',
	'Social Support Services',
	'Temp Agencies',
	'Training and Education',
	'Transportation Services',
	'Voluntary Work Opportunities',
	'Work Preparation Services',
	'Other Services',
];

const workReadinessOutcomes = [
	'Paid Work <15 Hours per Week',
	'Volunteer Work',
	'Full-time Study',
	'Part-time Study',
	'Participation in Training Program',
	'Carer',
	'Other',
];

const employmentOutcomes = [
	'Full-time Work (30+ Hours per Week)',
	'Part-time Work (15-29 Hours per Week)',
];

function createOptions(id, arr) {
	return { id, arr };
}

const options = [];


options.push(createOptions('#service-arm', serviceArms));
options.push(createOptions('#case-status', caseStatus));
options.push(createOptions('#employment-status', employmentOutcomes));
options.push(createOptions('#service-type', serviceTypes));
options.push(createOptions('#work-readiness-outcome', workReadinessOutcomes));
options.push(createOptions('#employment-outcome', employmentOutcomes));

function addOptions(selectElement, option, optionIndex) {
	const optionElement = document.createElement('option');
	optionElement.textContent = option;
	optionElement.value = optionIndex;
	selectElement.appendChild(optionElement);
}

options.forEach((option) => {
	option.arr.forEach((e, i) => {
		addOptions(document.querySelector(option.id), e, i);
	});
});
