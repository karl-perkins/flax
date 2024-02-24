class Case {
	wellbeingStarData = [];
	serviceData = [];
	workReadinessOutcomeData = [];
	employmentOutcomeData = [];

	constructor(
		serviceArm,
		referralDate,
		referralPathway,
		practitioner,
		gpTeamMember,
		caseStatus,
		closeReason,
		closeDate,
		provider
	) {
		this.serviceArm = serviceArm;
		this.referralDate = referralDate;
		this.referralPathway = referralPathway;
		this.practitioner = practitioner;
		this.gpTeamMember = gpTeamMember;
		this.caseStatus = caseStatus;
		this.closeReason = closeReason;
		this.closeDate = closeDate;
		this.provider = provider;
	}
}

class Enrolment {
	constructor(consentDate, planCreatedDate, enrolmentDate, enrolmentStatus) {
		this.consentDate = consentDate;
		this.planCreatedDate = planCreatedDate;
		this.enrolmentDate = enrolmentDate;
		this.enrolmentStatus = enrolmentStatus;
	}
}

class WellbeingStar {
	constructor(
		dateCompleted,
		lifestyle,
		lookingAfterYourself,
		managingSymptoms,
		workVolunteeringOther,
		money,
		whereYouLive,
		familyAndFriends,
		feelingPositive
	) {
		this.dateCompleted = dateCompleted;
		this.lifestyle = lifestyle;
		this.lookingAfterYourself = lookingAfterYourself;
		this.managingSymptoms = managingSymptoms;
		this.workVolunteeringOther = workVolunteeringOther;
		this.money = money;
		this.whereYouLive = whereYouLive;
		this.familyAndFriends = familyAndFriends;
		this.feelingPositive = feelingPositive;
	}
	get total() {
		return (
			this.lifestyle +
			this.lookingAfterYourself +
			this.managingSymptoms +
			this.workVolunteeringOther +
			this.money +
			this.whereYouLive +
			this.familyAndFriends +
			this.feelingPositive
		);
	}
}

class Service {
	constructor(dateServiceAccessed, serviceType) {
		this.dateServiceAccessed = dateServiceAccessed;
		this.serviceType = serviceType;
	}
	// get serviceTypeDesc() { return serviceTypes[this.serviceType] };
}

class WorkReadinessOutcome {
	constructor(outcome, startDate) {
		this.outcome = outcome;
		this.startDate = startDate;
	}
	// get outcomeDesc() { return workReadinessOutcomes[this.outcome]; };
}

class EmploymentOutcome {
	constructor(outcome, hoursPerWeek, startDate, endDate) {
		this.outcome = outcome;
		this.hoursPerWeek = hoursPerWeek;
		this.startDate = startDate;
		this.endDate = endDate;
	}
	// get outcomeDesc() { employmentOutcomes[outcome] };
}

function createCase(formData) {
	return new Case(
		formData.get('serviceArm'),
		formData.get('referralDate'),
		formData.get('provider'),
		formData.get('referralPathway'),
		formData.get('practitioner'),
		formData.get('gpTeamMember'),
		formData.get('status'),
		formData.get('closeReason'),
		formData.get('closeDate')
	);
}

const currentCase = new Case();

// function updateCase(formData) {
// 	serviceArm = formData.get('serviceArm');
// 	referralDate = formData.get('referralDate');
// 	provider = formData.get('provider');
// 	referralPathway = formData.get('referralPathway');
// 	practitioner = formData.get('practitioner');
// 	gpTeamMember = formData.get('gpTeamMember');
// 	status = formData.get('status');
// 	closeReason = formData.get('closeReason');
// 	closeDate = formData.get('closeDate');
// }

function createEnrolment(formData) {
	return new Enrolment(
		formData.get('consentDate'),
		formData.get('planCreatedDate'),
		formData.get('enrolmentDate'),
		formData.get('enrolmentStatus')
	);
}

// function updateEnrolment(formData) {
// 	const consentDate = formData.get('consentDate');
// 	const planCreatedDate = formData.get('planCreatedDate');
// 	const enrolmentDate = formData.get('enrolmentDate');
// 	const enrolmentStatus = formData.get('enrolmentStatus');
// }

function createWellbeingStar(formData) {
	return new WellbeingStar(
		formData.get('dateCompleted'),
		Number(formData.get('lifestyle')),
		Number(formData.get('lookingAfterYourself')),
		Number(formData.get('managingSymptoms')),
		Number(formData.get('workVolunteeringOther')),
		Number(formData.get('money')),
		Number(formData.get('whereYouLive')),
		Number(formData.get('familyAndFriends')),
		Number(formData.get('feelingPositive'))
	);
}

// function updateWellbeingStar(formData) {
// 	const dateCompleted = formData.get('dateCompleted');
// 	const lifestyle = Number(formData.get('lifestyle'));
// 	const lookingAfterYourself = Number(formData.get('lookingAfterYourself'));
// 	const managingSymptoms = Number(formData.get('managingSymptoms'));
// 	const workVolunteeringOther = Number(formData.get('workVolunteeringOther'));
// 	const money = Number(formData.get('money'));
// 	const whereYouLive = Number(formData.get('whereYouLive'));
// 	const familyAndFriends = Number(formData.get('familyAndFriends'));
// 	const feelingPositive = Number(formData.get('feelingPositive'));
// }

function createService(formData) {
	return new Service(
		formData.get('dateServiceAccessed'),
		formData.get('serviceType')
	);
}

// function updateService(formData) {
// 	const dateServiceAccessed = formData.get('dateServiceAccessed');
// 	const serviceType = formData.get('serviceType')
// }

function createWorkReadinessOutcome(formData) {
	return new WorkReadinessOutcome(formData.get('outcome'), formData.get('startDate'));
}

// function updateWorkReadinessOutcome(formData) {
// 	const outcome = formData.get('outcome');
// 	const startDate = formData.get('startDate');
// }

function createEmploymentOutcome(formData) {
	return new EmploymentOutcome(
		formData.get('outcome'),
		formData.get('hoursPerWeek'),
		formData.get('startDate'),
		formData.get('endDate')
	);
}

// function updateEmploymentOutcome(formData) {
// 	const outcome = formData.get('outcome');
// 	const hoursPerWeek = formData.get('hoursPerWeek');
// 	const startDate = formData.get('startDate');
// 	const endDate = formData.get('endDate');
// }

{
	const serviceArmOptions = ['Standard', 'Responding Early'];

	const caseStatusOptions = [
		'Awaiting Enrolment',
		'Did Not Proceed',
		'Active',
		'In Post-Placement Support',
		'Exited Service',
		'Transfer to Standard Service Arm',
	];

	const caseStatusToCloseReasons = {
		0: [0],
		1: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
		2: [0],
		3: [0],
		4: [2, 3, 4, 5, 6, 10, 15],
		5: [1],
	};

	const closeReasonOptions = [
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
	];

	const serviceTypeOptions = [
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

	const workReadinessOutcomeOptions = [
		'Paid Work <15 Hours per Week',
		'Volunteer Work',
		'Full-time Study',
		'Part-time Study',
		'Participation in Training Program',
		'Carer',
		'Other',
	];

	const employmentOutcomeOptions = [
		'Full-time Work (30+ Hours per Week)',
		'Part-time Work (15-29 Hours per Week)',
	];

	const providerOptions = [
		'Micky Mouse',
		'Minnie Mouse',
		'Donald Duck',
		'Goofy',
	];

	const referralPathwayOptions = [
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
		'Ashhurst Health centre',
	];

	function displayWellbeingStar(wellbeingStar) {
		return [
			wellbeingStar.dateCompleted,
			wellbeingStar.total,
			wellbeingStar.lifestyle,
			wellbeingStar.lookingAfterYourself,
			wellbeingStar.managingSymptoms,
			wellbeingStar.workVolunteeringOther,
			wellbeingStar.money,
			wellbeingStar.whereYouLive,
			wellbeingStar.familyAndFriends,
			wellbeingStar.feelingPositive,
		]
	}

	function displayService(service) {
		return [
			service.dateServiceAccessed,
			serviceTypeOptions[service.serviceType]
		]
	}

	function displayWorkReadinessOutcome(workReadinessOutcome) {
		return [
			workReadinessOutcomeOptions[workReadinessOutcome.outcome],
			workReadinessOutcome.startDate
		]
	}

	function displayEmploymentOutcome(employmentOutcome) {
		return [
			employmentOutcomeOptions[employmentOutcome.outcome],
			employmentOutcome.hoursPerWeek,
			employmentOutcome.startDate,
			employmentOutcome.endDate
		]
	}

	function createTableRows(tableBody, objArr, displayFn) {
		tableBody.innerHTML = '';

		objArr.forEach((obj) => {
			const row = tableBody.insertRow();

			for (const prop of displayFn(obj)) {
				row.insertCell().textContent = prop;
			}
		});
	}

	function submitForm(form, createObjFn, objArr, displayFn, tableBody, dialog) {
		const formData = new FormData(form);
		objArr.push(createObjFn(formData));
		createTableRows(tableBody, objArr, displayFn);
		form.reset();
		dialog.close();
	}

	function createSection(id, createObjFn, objArr, displayFn) {
		return { id, createObjFn, objArr, displayFn };
	}

	const sections = [
		createSection(
			'#wellbeing-star',
			createWellbeingStar,
			currentCase.wellbeingStarData,
			displayWellbeingStar,
		),
		createSection(
			'#services', 
			createService, 
			currentCase.serviceData,
			displayService,
		),
		createSection(
			'#work-readiness-outcomes',
			createWorkReadinessOutcome,
			currentCase.workReadinessOutcomeData,
			displayWorkReadinessOutcome,
		),
		createSection(
			'#employment-outcomes',
			createEmploymentOutcome,
			currentCase.employmentOutcomeData,
			displayEmploymentOutcome,
		),
	];

	sections.forEach((section) => {
		const root = document.querySelector(section.id);
		const dialog = root.querySelector('dialog');
		const showDialogButton = root.querySelector('dialog + button');
		const form = root.querySelector('form');
		const tableBody = root.querySelector('tbody');

		showDialogButton.addEventListener('click', () => dialog.showModal());

		form.addEventListener('submit', (e) => {
			e.preventDefault();
			submitForm(form, section.createObjFn, section.objArr, section.displayFn, tableBody, dialog);
		});
	});

	//
	// Options
	//
	function createOptions(id, arr) {
		return { id, arr };
	}

	const options = [
		createOptions('#service-arm', serviceArmOptions),
		createOptions('#provider', providerOptions),
		createOptions('#referral-pathway', referralPathwayOptions),
		createOptions('#case-status', caseStatusOptions),
		createOptions('#employment-status', employmentOutcomeOptions),
		createOptions('#service-type', serviceTypeOptions),
		createOptions('#work-readiness-outcome', workReadinessOutcomeOptions),
		createOptions('#employment-outcome', employmentOutcomeOptions),
	];

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
				reasons.forEach(reasonId => addOptions(closeReason, closeReasonOptions[reasonId], reasonId));
				break;
			}
			default: {
				const reasons = caseStatusToCloseReasons[closeReasonValue];
				reasons.forEach(reasonId => addOptions(closeReason, closeReasonOptions[reasonId], reasonId));
				closeDate.value = null;
				break;
			}
		}
	}

	caseStatusHandler();
	caseStatus.addEventListener('change', () => caseStatusHandler());

	// const caseDetails = createCase();
	// const caseForm = document.querySelector('#details > form');
	// caseForm.addEventListener('submit', (e) => {
	// 	console.log('submitted');
	// 	e.preventDefault();
	// 	const formData = new FormData(caseForm);
	// 	caseDetails.updateCase(formData);
	// 	console.log(caseDetails.getCase());
	// });
}
