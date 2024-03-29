
'use strict';

var postalTowns = {
  'AB': 'Aberdeen',
  'AL': 'St Albans',
  'B' : 'Birmingham',
  'BA': 'Bath',
  'BB': 'Blackburn',
  'BD': 'Bradford',
  'BH': 'Bournemouth',
  'BL': 'Bolton',
  'BN': 'Brighton',
  'BR': 'Bromley',
  'BS': 'Bristol',
  'BT': 'Northern Ireland',
  'CA': 'Carlisle',
  'CB': 'Cambridge',
  'CF': 'Cardiff',
  'CH': 'Chester',
  'CM': 'Chelmsford',
  'CO': 'Colchester',
  'CR': 'Croydon',
  'CT': 'Canterbury',
  'CV': 'Coventry',
  'CW': 'Crewe',
  'DA': 'Dartford',
  'DD': 'Dundee',
  'DE': 'Derby',
  'DG': 'Dumfries',
  'DH': 'Durham',
  'DL': 'Darlington',
  'DN': 'Doncaster',
  'DT': 'Dorchester',
  'DY': 'Dudley',
  'E' : 'East London',
  'EC': 'East Central London',
  'EH': 'Edinburgh',
  'EN': 'Enfield',
  'EX': 'Exeter',
  'FK': 'Falkirk',
  'FY': 'Blackpool',
  'G' : 'Glasgow',
  'GL': 'Gloucester',
  'GU': 'Guildford',
  'HA': 'Harrow',
  'HD': 'Huddersfield',
  'HG': 'Harrogate',
  'HP': 'Hemel Hempstead',
  'HR': 'Hereford',
  'HS': 'Outer Hebrides',
  'HU': 'Hull',
  'HX': 'Halifax',
  'IG': 'Ilford',
  'IP': 'Ipswich',
  'IV': 'Inverness',
  'KA': 'Kilmarnock',
  'KT': 'Kingston upon Thames',
  'KW': 'Kirkwall',
  'KY': 'Kirkcaldy',
  'L' : 'Liverpool',
  'LA': 'Lancaster',
  'LD': 'Llandrindod Wells',
  'LE': 'Leicester',
  'LL': 'Llandudno',
  'LN': 'Lincoln',
  'LS': 'Leeds',
  'LU': 'Luton',
  'M' : 'Manchester',
  'ME': 'Rochester',
  'MK': 'Milton Keynes',
  'ML': 'Motherwell',
  'N' : 'North London',
  'NE': 'Newcastle upon Tyne',
  'NG': 'Nottingham',
  'NN': 'Northampton',
  'NP': 'Newport',
  'NR': 'Norwich',
  'NW': 'North West London',
  'OL': 'Oldham',
  'OX': 'Oxford',
  'PA': 'Paisley',
  'PE': 'Peterborough',
  'PH': 'Perth',
  'PL': 'Plymouth',
  'PO': 'Portsmouth',
  'PR': 'Preston',
  'RG': 'Reading',
  'RH': 'Redhill',
  'RM': 'Romford',
  'S' : 'Sheffield',
  'SA': 'Swansea',
  'SE': 'South East London',
  'SG': 'Stevenage',
  'SK': 'Stockport',
  'SL': 'Slough',
  'SM': 'Sutton',
  'SN': 'Swindon',
  'SO': 'Southampton',
  'SP': 'Salisbury',
  'SR': 'Sunderland',
  'SS': 'Southend-on-Sea',
  'ST': 'Stoke-on-Trent',
  'SW': 'South West London',
  'SY': 'Shrewsbury',
  'TA': 'Taunton',
  'TD': 'Galashiels',
  'TF': 'Telford',
  'TN': 'Tonbridge',
  'TQ': 'Torquay',
  'TR': 'Truro',
  'TS': 'Cleveland',
  'TW': 'Twickenham',
  'UB': 'Southall',
  'W' : 'West London',
  'WA': 'Warrington',
  'WC': 'Western Central London',
  'WD': 'Watford',
  'WF': 'Wakefield',
  'WN': 'Wigan',
  'WR': 'Worcester',
  'WS': 'Walsall',
  'WV': 'Wolverhampton',
  'YO': 'York',
  'ZE': 'Lerwick'
};

app.filter('postcodeSplit', function() {
  return function(postcode) {
    var parts = postcode.match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})$/);
    parts.shift();
    return parts;
  };
})

app.filter('postcodePartial', function(postcodeSplitFilter) {
  return function(postcode) {
    return postcodeSplitFilter(postcode)[0];
  };
});

app.filter('postcodeFormat', function(postcodeSplitFilter) {
  return function(postcode) {
    return postcodeSplitFilter(postcode).join(' ');
  };
});

app.filter('postalTown', function(postcodeSplitFilter) {
  return function(postcode) {
    var parts = postcodeSplitFilter(postcode)[0].match(/^([A-Z]{1,2})(\d{1,2}[A-Z]?)/);
    parts.shift();
    return postalTowns[parts[0]];
  };
});
