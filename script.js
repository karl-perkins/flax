const wellbeingStarArray = [];
const servicesArray = [];
const workReadinessOutcomesArray = [];
const employmentOutcomesArray = [];

function createCase() {
	let serviceArm;
	let referralDate;
	let provider;
	let referralPathway;
	let practitioner;
	let gpTeamMember;
	let status;
	let closeReason;
	let closeDate;

	function updateCase(formData) {
		serviceArm = formData.get('serviceArm');
		referralDate = formData.get('referralDate');
		provider = formData.get('provider');
		referralPathway = formData.get('referralPathway');
		practitioner = formData.get('practitioner');
		gpTeamMember = formData.get('gpTeamMember');
		status = formData.get('status');
		closeReason = formData.get('closeReason');
		closeDate = formData.get('closeDate');
	}

	function getCase() {
		return  { serviceArm, referralDate, provider, referralPathway, practitioner, gpTeamMember, status, closeReason, closeDate };
	}

	return { getCase, updateCase };
}

function createEnrolment(formData) {
	const consentDate = formData.get('consentDate');
	const planCreatedDate = formData.get('planCreatedDate');
	const enrolmentDate = formData.get('enrolmentDate');
	const enrolmentStatus = formData.get('enrolmentStatus');

	return { consentDate, planCreatedDate, enrolmentDate, enrolmentStatus }
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

const caseStatuses = [
	'Awaiting Enrolment',
	'Did Not Proceed',
	'Active',
	'In Post-Placement Support',
	'Exited Service',
	'Transfer to Standard Service Arm',
]

const caseStatusToCloseReasons = {
	'0': [0],
	'1': [7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
	'2': [0],
	'3': [0],
	'4': [2, 3, 4, 5, 6, 10, 15],
	'5': [1],
}

const closeReasons = [
	'Not applicable',
	'Transfer to Standard Service Arm',
	'Achieved Desired Outcomes',
	'Completed Service Duration',
	'Provider Dismissed Client',
	'Moved Out of Area',
	'Unknown/Client Disengaged',
	'Already Participating in a Similar Service',
	'Chose Not to Participate',
	'Employment Goal Reached Prior to Enrolment',
	'Medical Reason',
	'Other Services More Appropriate',
	'Settled in Education/Training',
	'Unable to Contact',
	'Wrong Timing',
	'Other Reason',
	'Not Suitable',
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

const providers = [
	'Micky Mouse',
	'Minnie Mouse',
	'Donald Duck',
	'Goofy'
]

const referralPathways = [
	'169 Medical Centre',
	'Awapuni Medical Centre',
	'Best Care Whakapai Hauora',
	'Broadway Medical Centre',
	'City Doctors White Cross',
	'Cook Street Health Centre',
	'Dr Parrys Surgery',
	'Feilding Health Care',
	'Group Medical Chambers',
	'Health Hub Project',
	'Hokowhitu Medical Centre',
	'Horowhenua Community Practice',
	'Kauri Healthcare',
	'Masonic Medical',
	'Milson Medical Chambers',
	'Orbit Medical Centre',
	'Otaki Medical Centre',
	'Queen Street Surgery Levin',
	'Short Surgery Dannevirke',
	'Sydney Street Health Centre',
	'Tararua Health Group',
	'Tararua Medical Centre',
	'Te Waiora Community Health Services',
	'The Palms Medical Centre',
	'Victoria Medical',
	'Village Medical',
	'West End Medical Centre',
	'YOSS',
	'Employer',
	'Self-Referral',
	'MSD Case Manager',
	'Mātanga',
	'Union',
	'Te Tihi',
	'ACROSS',
	'Methodist Social Services',
	'Other',
	'Mana Whaikaha',
	'Mana o te Tangata',
	'Workbridge',
	'RIMA',
	'Levin Family Health',
	'Ashhurst Health centre'
]

function createOptions(id, arr) {
	return { id, arr };
}

const options = [];

options.push(createOptions('#service-arm', serviceArms));
options.push(createOptions('#provider', providers));
options.push(createOptions('#referral-pathway', referralPathways));
options.push(createOptions('#case-status', caseStatuses));
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

function getTodaysDate() {
	let today = new Date();
	const dd = String(today.getDate()).padStart(2, '0');
	const mm = String(today.getMonth() + 1).padStart(2, '0');
	const yyyy = today.getFullYear();
	today = yyyy + '-' + mm + '-' + dd;
	return today;
}

const caseStatus = document.querySelector('#case-status');
const closeReason = document.querySelector('#close-reason');
const closeDate = document.querySelector('#close-date');

function caseStatusHandler() {
	const closeReasonValue = document.querySelector('#case-status').value;

	closeReason.innerHTML = '';
	closeReason.disabled = true;
	closeDate.disabled = true;

	switch (closeReasonValue) {
		case '1':
		case '4': {
			closeReason.disabled = false;
		}
		case '5': {
			closeDate.disabled = false;
			closeDate.value = getTodaysDate();
			const reasons = caseStatusToCloseReasons[closeReasonValue];
			reasons.forEach(reasonId => addOptions(closeReason, closeReasons[reasonId], reasonId));
			break;
		}
		default: {
			const reasons = caseStatusToCloseReasons[closeReasonValue];
			reasons.forEach(reasonId => addOptions(closeReason, closeReasons[reasonId], reasonId));
			closeDate.value = null;
			break;
		}
	}
}

caseStatusHandler();
caseStatus.addEventListener('change', () => caseStatusHandler());

const caseDetails = createCase();
const caseForm = document.querySelector('#details > form');
caseForm.addEventListener('submit', (e) => {
	console.log('submitted');
	e.preventDefault();
	const formData = new FormData(caseForm);
	caseDetails.updateCase(formData);
	console.log(caseDetails.getCase());
});