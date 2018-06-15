"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var data = require("./example.json");
var express = require("express");
var typescript_rest_1 = require("typescript-rest");
var transform = require('./transform');
var HelloService = (function () {
    function HelloService() {
    }
    HelloService.prototype.loadJson = function () {
        var word = data;
        console.log(word); // output 'testing'clear
        return word;
    };
    return HelloService;
}());
__decorate([
    typescript_rest_1.Path("/loadJson"),
    typescript_rest_1.GET,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HelloService.prototype, "loadJson", null);
HelloService = __decorate([
    typescript_rest_1.Path("/service"),
    __metadata("design:paramtypes", [])
], HelloService);
var HelloService1 = (function () {
    function HelloService1() {
    }
    HelloService1.prototype.loadJson1 = function () {
        var data = {
            discharge_summary: {
                "_uid": "16cad9dd-cc4b-42f8-b7b2-980835d9e977::ripple_osi.ehrscape.c4h::1",
                "language|code": "en",
                "language|terminology": "ISO_639-1",
                "territory|code": "GB",
                "territory|terminology": "ISO_3166-1",
                "context": {
                    "_health_care_facility|id": "904",
                    "_health_care_facility|id_scheme": "iEHR",
                    "_health_care_facility|id_namespace": "iEHR",
                    "_health_care_facility|name": "St.James's Hospital (Dublin)",
                    "patient_identifiers": {
                        "mrn": "9999999000",
                        "mrn|issuer": "iEHR",
                        "mrn|assigner": "iEHR",
                        "mrn|type": "MRN",
                        "oth": "1020714",
                        "oth|issuer": "iEHR",
                        "oth|assigner": "iEHR",
                        "oth|type": "OTH",
                        "gms": "-",
                        "gms|issuer": "iEHR",
                        "gms|assigner": "iEHR",
                        "gms|type": "GMS"
                    },
                    "start_time": "2010-05-14T00:00:00Z",
                    "setting|code": "238",
                    "setting|value": "other care",
                    "setting|terminology": "openehr"
                },
                "discharge_details": {
                    "discharge_details_uk_v1": {
                        "responsible_professional": {
                            "professional_name": {
                                "name": "COOKE MR FIACHRA"
                            },
                            "professional_identifier": "4547",
                            "professional_identifier|issuer": "iEHR",
                            "professional_identifier|assigner": "iEHR",
                            "professional_identifier|type": "MCN"
                        },
                        "language|code": "en",
                        "language|terminology": "ISO_639-1",
                        "encoding|code": "UTF-8",
                        "encoding|terminology": "IANA_character-sets"
                    }
                },
                "diagnoses": {
                    "problem_diagnosis": [
                        {
                            "problem_diagnosis_name": "Cholecystectomy",
                            "problem_diagnosis_status": {
                                "diagnostic_status|code": "at0017",
                                "diagnostic_status|value": "Working",
                                "diagnostic_status|terminology": "local"
                            },
                            "language|code": "en",
                            "language|terminology": "ISO_639-1",
                            "encoding|code": "UTF-8",
                            "encoding|terminology": "IANA_character-sets"
                        }
                    ]
                },
                "clinical_summary": {
                    "clinical_synopsis": {
                        "synopsis": "ADMISSION REASON: Admit with acute abdominal pain, deranged LFTs, normal amylase DIAGNOSIS: Cholecystectomy PROBLEMS: Abdominal pain PROBLEMS: Gallstones THEATRE PROCS: Lap Chole NON THEATRE PROCS: None LAB INVESTIGATIONS: As attached - FBC, UE, LFTs, Amylase RAD INVESTIGATIONS: As attached - USS Abdomen, MRCP OTHER INVESTIGATIONS: None PROGRESS DURING STAY: Uncomplicated post operative recovery.Full diet tolerated, wound sites dry and intact, no oozing. Vital signs normal, apyrexial. Mobilising/teds/clexane. No c/o abdominal pain. C/O right shoulder tip pain - advised post operative complication and should resolve within several days. Normal MRCP pre-op. Dx = acute cholecystitis with transiemt choledocholithiasis. ALLERGIES: NKDA DISCHARGE MEDICATION: MEDICATION:Refused analgesia on d/c INFO GIVEN TO PATIENT: All results and surgery as above explained. For removal of clips in 10/7 in dressing clinic - appt given. Avoid constipation OPD FOLLOW UP: 6/52 GP ACTIONS: Routine follow up",
                        "language|code": "en",
                        "language|terminology": "ISO_639-1",
                        "encoding|code": "UTF-8",
                        "encoding|terminology": "IANA_character-sets"
                    }
                },
                "composer|id": "023781",
                "composer|id_scheme": "Medical Council No",
                "composer|id_namespace": "iEHR",
                "composer|name": "McCrea, Siobhan"
            }
        };
        var outputTemplate = {
            sourceId: '{{discharge_summary._uid}}',
            author_name: '{{discharge_summary["composer|name"]}}',
            author_id: '{{discharge_summary["composer|id"]}}',
            author_idScheme: '{{discharge_summary["composer|id_scheme"]}}',
            documentDate: '{{discharge_summary.context.start_time}}',
            facility: '{{discharge_summary.context["_health_care_facility|name"]}}',
            patientIdentifier_mrn: '{{discharge_summary.context.patient_identifiers.mrn}}',
            patientIdentifier_mrnType: '{{discharge_summary.context.patient_identifiers["mrn|type"]}}',
            patientIdentifier_oth: '{{discharge_summary.context.patient_identifiers.oth}}',
            patientIdentifier_othType: '{{discharge_summary.context.patient_identifiers["oth|type"]}}',
            patientIdentifier_gms: '{{discharge_summary.context.patient_identifiers.gms}}',
            patientIdentifier_gmsType: '{{discharge_summary.context.patient_identifiers["gms|type"]}}',
            responsibleProfessional_name: '{{discharge_summary.discharge_details.discharge_details_uk_v1.responsible_professional.professional_name.name}}',
            responsibleProfessional_id: '{{discharge_summary.discharge_details.discharge_details_uk_v1.responsible_professional.professional_identifier}}',
            responsibleProfessional_idType: '{{discharge_summary.discharge_details.discharge_details_uk_v1.responsible_professional["professional_identifier|type"]}}',
            dischargingOrganisation: '{{discharge_summary.discharge_details.discharge_details_uk_v1.discharging_organisation.name_of_organisation}}',
            dateTimeOfDischarge: '{{discharge_summary.discharge_details.discharge_details_uk_v1.discharging_organisation.name_of_organisatio.date_time_of_discharge}}',
            clinicalSynopsis: '{{discharge_summary.clinical_summary.clinical_synopsis.synopsis}}',
            dateOfAdmission: '{{discharge_summary.admission_details.inpatient_admission.date_of_admission}}',
            diagnosisList: [
                '{{discharge_summary.diagnoses.problem_diagnosis}}',
                {
                    problem: '{{problem_diagnosis_name}}',
                    description: '{{problem_diagnosis_status["diagnostic_status|value"]}}',
                    terminology: '{{problem_diagnosis_status["diagnostic_status|terminology"]}}',
                    terminologyCode: '{{problem_diagnosis_status["diagnostic_status|code"]}}'
                }
            ]
        };
        var output = transform(outputTemplate, data);
        console.log('output = ' + JSON.stringify(output, null, 2));
        return output;
    };
    return HelloService1;
}());
__decorate([
    typescript_rest_1.Path("/loadJson1"),
    typescript_rest_1.GET,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HelloService1.prototype, "loadJson1", null);
HelloService1 = __decorate([
    typescript_rest_1.Path("/service1"),
    __metadata("design:paramtypes", [])
], HelloService1);
var StyleDivUpdate = (function () {
    function StyleDivUpdate() {
    }
    StyleDivUpdate.prototype.loadJson = function () {
        var data = { euJson: {
                "baseID": "123",
                "name": "Air Max 270 Flyknit",
                "description": "Lorem Ipsum dolor",
                "brand": "Nike",
                "gender": "Women",
                "family": "Footwear",
                "brand_image_url": "https://runnerspoint.scene7.com/is/image/rpe/Nike?$fl_launchcalendar_brand$",
                "products": [
                    {
                        "sku": "315245966502",
                        "date": "2018-03-22 09:00:00",
                        "image_url": "https://runnerspoint.scene7.com/is/image/rpe/315245966502_01?$fl_launchcalendar_product$",
                        "color": "Clear Emerald / Black / Pure Platinum",
                        "deeplinks": {
                            "276": "https://www.footlocker.de/de/p/nike-air-max-270-flyknit-damen-schuhe-63670?v=315245966502",
                            "578": "https://www.footlocker.no/en/p/nike-air-max-270-flyknit-women-shoes-63670?v=315245966502"
                        },
                        "prices": [
                            {
                                "country_code": "276",
                                "currency": "EUR",
                                "price": "169.99"
                            },
                            {
                                "country_code": "578",
                                "currency": "NOK",
                                "price": "1699.00"
                            }
                        ],
                        "sizes": [
                            {
                                "size_code": "060",
                                "UK": "3.5",
                                "EUR": "36.5",
                                "US": "6"
                            },
                            {
                                "size_code": "065",
                                "UK": "4",
                                "EUR": "37.5",
                                "US": "6.5"
                            }
                        ]
                    }
                ]
            }
        };
        var outputTemplate = {
            level: 'SKU',
            type: 'ADD',
            keys: [
                '{{euJson.products}}',
                '{{euJson.products["sku"]}}'
            ],
            parent: {
                parent: {
                    modelId: '{{euJson.baseID}}'
                },
                cpi: '315245966502'
            },
            data: {
                skuLastUpdateBy: 'batch',
                skuLastUpdateDate: '{{products.date}}',
                skuNumber: '{{products.sku}}',
                skuCreateDate: '{{products.date}}',
                skuCreateBy: null,
                legacySize: {
                    sizeCodes: [
                        {
                            legacySizeCode: '{{products.sizes.size_code}}',
                            division: '{{products.prices.country_code}}'
                        }
                    ],
                    sizeDescs: [
                        {
                            region: 'USA',
                            desc: '{{products.sizes.USA}}'
                        },
                        {
                            region: "UK",
                            desc: '{{products.sizes.UK}}'
                        },
                        {
                            region: "EUR",
                            desc: '{{products.sizes.EUR}}'
                        }
                    ]
                }
            }
        };
        var output = transform(outputTemplate, data);
        console.log('output = ' + JSON.stringify(output, null, 2));
        return output;
    };
    return StyleDivUpdate;
}());
__decorate([
    typescript_rest_1.Path("/loadJson"),
    typescript_rest_1.GET,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StyleDivUpdate.prototype, "loadJson", null);
StyleDivUpdate = __decorate([
    typescript_rest_1.Path("/styleDivUpdate"),
    __metadata("design:paramtypes", [])
], StyleDivUpdate);
var app = express();
typescript_rest_1.Server.buildServices(app);
app.listen(3000, function () {
    console.log('Rest Server listening on port 3000!');
});
