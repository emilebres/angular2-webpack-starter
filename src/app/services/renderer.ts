// import {RefData} from './refData';

// export function skillsCellRenderer(params) {
//     var data = params.data;
//     var skills = [];
//     RefData.IT_SKILLS.forEach(function (skill) {
//         if (data && data.skills && data.skills[skill]) {
//             skills.push('<img src="/images/skills/' + skill + '.png" width="16px" title="' + skill + '" />');
//         }
//     });
//     return skills.join(' ');
// }

// export function countryCellRenderer(params) {
//     var flag = "<img border='0' width='15' height='10' style='margin-bottom: 2px' src='../images/flags/" + RefData.COUNTRY_CODES[params.value] + ".png'>";
//     return flag + " " + params.value;
// }

// export function percentCellRenderer(params) {
//     var value = params.value;

//     var eDivPercentBar = document.createElement('div');
//     eDivPercentBar.className = 'div-percent-bar';
//     eDivPercentBar.style.width = value + '%';
//     if (value < 20) {
//         eDivPercentBar.style.backgroundColor = 'red';
//     } else if (value < 60) {
//         eDivPercentBar.style.backgroundColor = '#ff9900';
//     } else {
//         eDivPercentBar.style.backgroundColor = '#00A000';
//     }

//     var eValue = document.createElement('div');
//     eValue.className = 'div-percent-value';
//     eValue.innerHTML = value + '%';

//     var eOuterDiv = document.createElement('div');
//     eOuterDiv.className = 'div-outer-div';
//     eOuterDiv.appendChild(eValue);
//     eOuterDiv.appendChild(eDivPercentBar);

//     return eOuterDiv;
// }