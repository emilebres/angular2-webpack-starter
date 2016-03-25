// import {Injectable} from 'angular2/core'
// import {RefData} from './refData';


// @Injectable()
// export class DataService {
// 	getData() {
// 		return Promise.resolve(this.createRowData(200))
// 	}

// 	getRefData() {
// 		return Promise.resolve(RefData);
// 	}

// 	private createRowData(n: number) {
// 	    var rowData: any[] = [];

// 	    for (var i = 0; i < n; i++) {
// 	        var countryData = RefData.countries[i % RefData.countries.length];
// 	        rowData.push({
// 	            name: RefData.firstNames[i % RefData.firstNames.length] + ' ' + RefData.lastNames[i % RefData.lastNames.length],
// 	            skills: {
// 	                android: Math.random() < 0.4,
// 	                html5: Math.random() < 0.4,
// 	                mac: Math.random() < 0.4,
// 	                windows: Math.random() < 0.4,
// 	                css: Math.random() < 0.4
// 	            },
// 	            address: RefData.addresses[i % RefData.addresses.length],
// 	            years: Math.round(Math.random() * 100),
// 	            proficiency: Math.round(Math.random() * 100),
// 	            country: countryData.country,
// 	            continent: countryData.continent,
// 	            language: countryData.language,
// 	            mobile: this.createRandomPhoneNumber(),
// 	            landline: this.createRandomPhoneNumber()
// 	        });
// 	    }

// 	    return rowData;
// 	}

// 	private createRandomPhoneNumber() {
// 	    var result = '+';
// 	    for (var i = 0; i < 12; i++) {
// 	        result += Math.round(Math.random() * 10);
// 	        if (i === 2 || i === 5 || i === 8) {
// 	            result += ' ';
// 	        }
// 	    }
// 	    return result;
// 	}
// }

