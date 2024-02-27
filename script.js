class Case {
	constructor(
		serviceArm,
		referralDate,
		referralPathway,
		practitioner,
		gpTeamMember,
		caseStatus,
		closeReason,
		closeDate,
		serviceProvider
	) {
		this.serviceArm = serviceArm;
		this.referralDate = referralDate;
		this.referralPathway = referralPathway;
		this.practitioner = practitioner;
		this.gpTeamMember = gpTeamMember;
		this.caseStatus = caseStatus;
		this.closeReason = closeReason;
		this.closeDate = closeDate;
		this.serviceProvider = serviceProvider;
		this.enrolment = new Enrolment();
		this.wellbeingStarData = [];
		this.serviceData = [];
		this.workReadinessOutcomeData = [];
		this.employmentOutcomeData = [];
	}
}

class Enrolment {
	constructor(consentDate, planCreatedDate, enrolmentDate, employmentStatus) {
		this.consentDate = consentDate;
		this.planCreatedDate = planCreatedDate;
		this.enrolmentDate = enrolmentDate;
		this.employmentStatus = employmentStatus;
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
}

class WorkReadinessOutcome {
	constructor(outcome, startDate) {
		this.outcome = outcome;
		this.startDate = startDate;
	}
}

class EmploymentOutcome {
	constructor(outcome, hoursPerWeek, startDate, endDate) {
		this.outcome = outcome;
		this.hoursPerWeek = hoursPerWeek;
		this.startDate = startDate;
		this.endDate = endDate;
	}
}

class CaseController {
	constructor (currentCase) {
		this.currentCase = currentCase;
	}

	createCase(formData) {
		return new Case(
			formData.get('serviceArm'),
			formData.get('referralDate'),
			formData.get('serviceProvider'),
			formData.get('referralPathway'),
			formData.get('practitioner'),
			formData.get('gpTeamMember'),
			formData.get('caseStatus'),
			formData.get('closeReason'),
			formData.get('closeDate')
		);
	}

	updateCase(caseObj, formData) {
		caseObj.serviceArm = formData.get('serviceArm');
		caseObj.referralDate = formData.get('referralDate');
		caseObj.provider = formData.get('serviceProvider');
		caseObj.referralPathway = formData.get('referralPathway');
		caseObj.practitioner = formData.get('practitioner');
		caseObj.gpTeamMember = formData.get('gpTeamMember');
		caseObj.caseStatus = formData.get('caseStatus');
		caseObj.closeReason = formData.get('closeReason');
		caseObj.closeDate = formData.get('closeDate');
		return caseObj;
	}

	createEnrolment(formData) {
		return new Enrolment(
			formData.get('consentDate'),
			formData.get('planCreatedDate'),
			formData.get('enrolmentDate'),
			formData.get('enrolmentStatus')
		);
	}

	updateEnrolment(enrolment, formData) {
		enrolment.consentDate = formData.get('consentDate');
		enrolment.planCreatedDate = formData.get('planCreatedDate');
		enrolment.enrolmentDate = formData.get('enrolmentDate');
		enrolment.employmentStatus = formData.get('employmentStatus');
		return enrolment;
	}

	createWellbeingStar(formData) {
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

	updateWellbeingStar(wellbeingStar, formData) {
		wellbeingStar.dateCompleted = formData.get('dateCompleted');
		wellbeingStar.lifestyle = Number(formData.get('lifestyle'));
		wellbeingStar.lookingAfterYourself = Number(formData.get('lookingAfterYourself'));
		wellbeingStar.managingSymptoms = Number(formData.get('managingSymptoms'));
		wellbeingStar.workVolunteeringOther = Number(formData.get('workVolunteeringOther'));
		wellbeingStar.money = Number(formData.get('money'));
		wellbeingStar.whereYouLive = Number(formData.get('whereYouLive'));
		wellbeingStar.familyAndFriends = Number(formData.get('familyAndFriends'));
		wellbeingStar.feelingPositive = Number(formData.get('feelingPositive'));
		return wellbeingStar;
	}

	createService(formData) {
		return new Service(
			formData.get('dateServiceAccessed'),
			formData.get('serviceType')
		);
	}

	updateService(service, formData) {
		service.dateServiceAccessed = formData.get('dateServiceAccessed');
		service.serviceType = formData.get('serviceType');
		return service;
	}

	createWorkReadinessOutcome(formData) {
		return new WorkReadinessOutcome(
			formData.get('outcome'),
			formData.get('startDate')
		);
	}

	updateWorkReadinessOutcome(workReadinessOutcome, formData) {
		workReadinessOutcome.outcome = formData.get('outcome');
		workReadinessOutcome.startDate = formData.get('startDate');
		return workReadinessOutcome;
	}

	createEmploymentOutcome(formData) {
		return new EmploymentOutcome(
			formData.get('outcome'),
			formData.get('hoursPerWeek'),
			formData.get('startDate'),
			formData.get('endDate')
		);
	}

	updateEmploymentOutcome(employmentOutcome, formData) {
		employmentOutcome.outcome = formData.get('outcome');
		employmentOutcome.hoursPerWeek = formData.get('hoursPerWeek');
		employmentOutcome.startDate = formData.get('startDate');
		employmentOutcome.endDate = formData.get('endDate');
		return employmentOutcome;
	}
}

class DisplayController {
	constructor (caseController) {
		this.caseController =  caseController;
	}

	serviceArmOptions = ['Standard', 'Responding Early'];

	serviceArmToCaseStatusOptions = {
		0: [0, 1, 2, 3, 4],
		1: [0, 1, 2, 4, 5]
	}

	caseStatusOptions = [
		'Awaiting Enrolment',
		'Did Not Proceed',
		'Active',
		'In Post-Placement Support',
		'Exited Service',
		'Transfer to Standard Service Arm',
	];

	caseStatusToCloseReasonOptions = {
		0: [0],
		1: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
		2: [0],
		3: [0],
		4: [2, 3, 4, 5, 6, 10, 15],
		5: [1],
	};

	closeReasonOptions = [
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

	serviceTypeOptions = [
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

	workReadinessOutcomeOptions = [
		'Paid Work <15 Hours per Week',
		'Volunteer Work',
		'Full-time Study',
		'Part-time Study',
		'Participation in Training Program',
		'Carer',
		'Other',
	];

	serviceArmToEmploymentStatusOptions = {
		0: [0],
		1: [1, 2]
	}

	employmentStatusOptions = [
		'Not applicable',
		'Full-time Work (30+ Hours per Week)',
		'Part-time Work (15-29 Hours per Week)',
	];

	serviceArmToEmploymentOutcomeOptions = {
		0: [0, 1],
		1: [0, 1, 2, 3]
	}

	employmentOutcomeOptions = [
		'Started Full-time Work (30+ Hours per Week)',
		'Started Part-time Work (15-29 Hours per Week)',
		'Retained Full-time Work (30+ Hours per Week)',
		'Retained Part-time Work (15-29 Hours per Week)',
	];

	providerOptions = ['Micky Mouse', 'Minnie Mouse', 'Donald Duck', 'Goofy'];

	referralPathwayOptions = [
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

	displayWellbeingStar(wellbeingStar) {
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
		];
	}

	displayService = (service) => {
		return [
			service.dateServiceAccessed,
			this.serviceTypeOptions[service.serviceType],
		];
	};

	displayWorkReadinessOutcome = (workReadinessOutcome) => {
		return [
			this.workReadinessOutcomeOptions[workReadinessOutcome.outcome],
			workReadinessOutcome.startDate,
		];
	};

	displayEmploymentOutcome = (employmentOutcome) => {
		return [
			this.employmentOutcomeOptions[employmentOutcome.outcome],
			employmentOutcome.hoursPerWeek,
			employmentOutcome.startDate,
			employmentOutcome.endDate,
		];
	};

	createTableRows(tableBody, objArr, displayFn) {
		tableBody.innerHTML = '';

		objArr.forEach((obj) => {
			const row = tableBody.insertRow();

			for (const prop of displayFn(obj)) {
				row.insertCell().textContent = prop;
			}
		});
	}

	submitForm(form, createObjFn, objArr, displayFn, tableBody, dialog) {
		const formData = new FormData(form);
		objArr.push(createObjFn(formData));
		this.createTableRows(tableBody, objArr, displayFn);
		form.reset();
		dialog.close();
	}

	createSection(id, createObjFn, objArr, displayFn) {
		return { id, createObjFn, objArr, displayFn };
	}

	sections = [
		this.createSection(
			'#wellbeing-star',
			caseController.createWellbeingStar,
			caseController.currentCase.wellbeingStarData,
			this.displayWellbeingStar
		),
		this.createSection(
			'#services',
			caseController.createService,
			caseController.currentCase.serviceData,
			this.displayService
		),
		this.createSection(
			'#work-readiness-outcomes',
			caseController.createWorkReadinessOutcome,
			caseController.currentCase.workReadinessOutcomeData,
			this.displayWorkReadinessOutcome
		),
		this.createSection(
			'#employment-outcomes',
			caseController.createEmploymentOutcome,
			caseController.currentCase.employmentOutcomeData,
			this.displayEmploymentOutcome
		),
	];

	dialogHandler(section) {
		const root = document.querySelector(section.id);
		const dialog = root.querySelector('dialog');
		const showDialogButton = root.querySelector('dialog + button');
		const form = root.querySelector('form');
		const tableBody = root.querySelector('tbody');

		showDialogButton.addEventListener('click', () => dialog.showModal());

		form.addEventListener('submit', (e) => {
			e.preventDefault();
			this.submitForm(
				form,
				section.createObjFn,
				section.objArr,
				section.displayFn,
				tableBody,
				dialog
			);
		});
	}

	addDialogHandler() {
		this.sections.forEach((section) => this.dialogHandler(section));
	}

	createOptions(id, arr) {
		return { id, arr };
	}

	options = [
		this.createOptions('#service-arm', this.serviceArmOptions),
		this.createOptions('#service-provider', this.providerOptions),
		this.createOptions('#referral-pathway', this.referralPathwayOptions),
		this.createOptions('#service-type', this.serviceTypeOptions),
		this.createOptions('#work-readiness-outcome', this.workReadinessOutcomeOptions),
		// this.createOptions('#employment-outcome', this.employmentOutcomeOptions),
	];

	optionsHandler(selectElement, option, optionIndex) {
		const optionElement = document.createElement('option');
		optionElement.textContent = option;
		optionElement.value = optionIndex;
		selectElement.appendChild(optionElement);
	}

	addOptionsHandler() {
		this.options.forEach((option) => {
			option.arr.forEach((e, i) => {
				this.optionsHandler(document.querySelector(option.id), e, i);
			});
		});
	}

	getTodaysDate() {
		let today = new Date();
		const dd = String(today.getDate()).padStart(2, '0');
		const mm = String(today.getMonth() + 1).padStart(2, '0');
		const yyyy = today.getFullYear();
		today = yyyy + '-' + mm + '-' + dd;
		return today;
	}

	serviceArmHandler() {
		const serviceArmValue = document.querySelector('#service-arm').value;
		const caseStatus = document.querySelector('#case-status');
		caseStatus.innerHTML = '';
		const caseStatusOptions = this.serviceArmToCaseStatusOptions[serviceArmValue];

		caseStatusOptions.forEach((serviceArmId) => {
			this.optionsHandler(
				caseStatus,
				this.caseStatusOptions[serviceArmId],
				serviceArmId
			);
		});

		const employmentStatus = document.querySelector('#employment-status');
		employmentStatus.innerHTML = '';
		const employmentStatusOptions = this.serviceArmToEmploymentStatusOptions[serviceArmValue];

		employmentStatusOptions.forEach((employmentStatusId) => {
			this.optionsHandler(
				employmentStatus,
				this.employmentStatusOptions[employmentStatusId],
				employmentStatusId
			);
		});

		const workReadinessOutcomes = document.querySelector('#work-readiness-outcomes');
		if (serviceArmValue === '0') {
			employmentStatus.disabled = true;
			workReadinessOutcomes.style.display = 'block';
		} else {
			employmentStatus.disabled = false;
			workReadinessOutcomes.style.display = 'none';
		}

		const employmentOutcomes = document.querySelector('#employment-outcome');
		employmentOutcomes.innerHTML = '';
		const employmentOutcomeOptions = this.serviceArmToEmploymentOutcomeOptions[serviceArmValue];

		employmentOutcomeOptions.forEach(employmentOutcomeId => {
			this.optionsHandler(
				employmentOutcomes,
				this.employmentOutcomeOptions[employmentOutcomeId],
				employmentOutcomeId
			);
		});
	}

	addServiceArmHandler() {
		const serviceArm = document.querySelector('#service-arm');
		serviceArm.addEventListener('change', () => {
			this.serviceArmHandler()
			this.caseStatusHandler();
		});
	}

	caseStatusHandler() {
		const closeReasonValue = document.querySelector('#case-status').value;
		const closeReason = document.querySelector('#close-reason');
		const closeDate = document.querySelector('#close-date');

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
				closeDate.value = this.getTodaysDate();
				const reasons = this.caseStatusToCloseReasonOptions[closeReasonValue];
				reasons.forEach((reasonId) =>
					this.optionsHandler(
						closeReason,
						this.closeReasonOptions[reasonId],
						reasonId
					)
				);
				break;
			}
			default: {
				const reasons = this.caseStatusToCloseReasonOptions[closeReasonValue];
				reasons.forEach((reasonId) =>
					this.optionsHandler(
						closeReason,
						this.closeReasonOptions[reasonId],
						reasonId
					)
				);
				closeDate.value = null;
				break;
			}
		}
	}

	addCaseStatusHandler() {
		const caseStatus = document.querySelector('#case-status');
		caseStatus.addEventListener('change', () => this.caseStatusHandler());
	}

	addCaseFormHandler() {
		const caseForm = document.querySelector('#details > form');
		caseForm.addEventListener('submit', (e) => {
			e.preventDefault();
			const formData = new FormData(caseForm);
			this.caseController.updateCase(this.caseController.currentCase, formData);
		});
	}

	addEnrolmentFormHandler() {
		const enrolmentForm = document.querySelector('#enrolment > form');
		enrolmentForm.addEventListener('submit', (e) => {
			e.preventDefault();
			const formData = new FormData(enrolmentForm);
			this.caseController.updateEnrolment(this.caseController.currentCase.enrolment, formData);
		});
	}
}

const currentCase = new Case();
const caseController = new CaseController(currentCase);
const displayController = new DisplayController(caseController);

displayController.addDialogHandler();
displayController.addOptionsHandler();
displayController.serviceArmHandler(); // Run once on load
displayController.addServiceArmHandler();
displayController.caseStatusHandler(); // Run once on load
displayController.addCaseStatusHandler();
displayController.addCaseFormHandler();
displayController.addEnrolmentFormHandler();