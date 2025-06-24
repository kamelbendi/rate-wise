const countryToFlag = (country) => {
  const countryMap = {
    Afghanistan: 'AF', Albania: 'AL', Algeria: 'DZ', Angola: 'AO', Argentina: 'AR', Armenia: 'AM', Australia: 'AU', Austria: 'AT', Azerbaijan: 'AZ', Bahamas: 'BS', Bahrain: 'BH', Bangladesh: 'BD', Barbados: 'BB', Belarus: 'BY', Belgium: 'BE', Belize: 'BZ', Benin: 'BJ', Bermuda: 'BM', Bhutan: 'BT', Bolivia: 'BO', Bosnia: 'BA', Botswana: 'BW', Brazil: 'BR', Brunei: 'BN', Bulgaria: 'BG', Burkina: 'BF', Burundi: 'BI', Cambodia: 'KH', Cameroon: 'CM', Canada: 'CA', Cape: 'CV', Cayman: 'KY', Central: 'CF', Chad: 'TD', Chile: 'CL', China: 'CN', Colombia: 'CO', Comoros: 'KM', Congo: 'CG', Costa: 'CR', Croatia: 'HR', Cuba: 'CU', Cyprus: 'CY', Czech: 'CZ', Denmark: 'DK', Djibouti: 'DJ', Dominica: 'DM', Dominican: 'DO', Ecuador: 'EC', Egypt: 'EG', El: 'SV', Equatorial: 'GQ', Eritrea: 'ER', Estonia: 'EE', Eswatini: 'SZ', Ethiopia: 'ET', Fiji: 'FJ', Finland: 'FI', France: 'FR', Gabon: 'GA', Gambia: 'GM', Georgia: 'GE', Germany: 'DE', Ghana: 'GH', Greece: 'GR', Grenada: 'GD', Guatemala: 'GT', Guinea: 'GN', GuineaBissau: 'GW', Guyana: 'GY', Haiti: 'HT', Honduras: 'HN', Hungary: 'HU', Iceland: 'IS', India: 'IN', Indonesia: 'ID', Iran: 'IR', Iraq: 'IQ', Ireland: 'IE', Israel: 'IL', Italy: 'IT', Jamaica: 'JM', Japan: 'JP', Jordan: 'JO', Kazakhstan: 'KZ', Kenya: 'KE', Kiribati: 'KI', Korea: 'KR', Kuwait: 'KW', Kyrgyzstan: 'KG', Laos: 'LA', Latvia: 'LV', Lebanon: 'LB', Lesotho: 'LS', Liberia: 'LR', Libya: 'LY', Liechtenstein: 'LI', Lithuania: 'LT', Luxembourg: 'LU', Madagascar: 'MG', Malawi: 'MW', Malaysia: 'MY', Maldives: 'MV', Mali: 'ML', Malta: 'MT', Marshall: 'MH', Mauritania: 'MR', Mauritius: 'MU', Mexico: 'MX', Micronesia: 'FM', Moldova: 'MD', Monaco: 'MC', Mongolia: 'MN', Montenegro: 'ME', Morocco: 'MA', Mozambique: 'MZ', Myanmar: 'MM', Namibia: 'NA', Nauru: 'NR', Nepal: 'NP', Netherlands: 'NL', NewZealand: 'NZ', Nicaragua: 'NI', Niger: 'NE', Nigeria: 'NG', NorthMacedonia: 'MK', Norway: 'NO', Oman: 'OM', Pakistan: 'PK', Palau: 'PW', Panama: 'PA', Papua: 'PG', Paraguay: 'PY', Peru: 'PE', Philippines: 'PH', Poland: 'PL', Portugal: 'PT', Qatar: 'QA', Romania: 'RO', Russia: 'RU', Rwanda: 'RW', SaintKitts: 'KN', SaintLucia: 'LC', SaintVincent: 'VC', Samoa: 'WS', SanMarino: 'SM', SaoTome: 'ST', SaudiArabia: 'SA', Senegal: 'SN', Serbia: 'RS', Seychelles: 'SC', SierraLeone: 'SL', Singapore: 'SG', Slovakia: 'SK', Slovenia: 'SI', Solomon: 'SB', Somalia: 'SO', SouthAfrica: 'ZA', SouthSudan: 'SS', Spain: 'ES', SriLanka: 'LK', Sudan: 'SD', Suriname: 'SR', Sweden: 'SE', Switzerland: 'CH', Syria: 'SY', Taiwan: 'TW', Tajikistan: 'TJ', Tanzania: 'TZ', Thailand: 'TH', TimorLeste: 'TL', Togo: 'TG', Tonga: 'TO', Trinidad: 'TT', Tunisia: 'TN', Turkey: 'TR', Turkmenistan: 'TM', Tuvalu: 'TV', Uganda: 'UG', Ukraine: 'UA', UnitedArabEmirates: 'AE', UnitedKingdom: 'GB', UnitedStates: 'US', Uruguay: 'UY', Uzbekistan: 'UZ', Vanuatu: 'VU', Vatican: 'VA', Venezuela: 'VE', Vietnam: 'VN', Yemen: 'YE', Zambia: 'ZM', Zimbabwe: 'ZW', Eurozone: 'EU', EuropeanUnion: 'EU', "East Caribbean": 'AG', "Hong Kong": 'HK', "Czech Republic": 'CZ', "South Korea": 'KR', "North Korea": 'KP', "Ivory Coast": 'CI', "New Zealand": 'NZ', "United States": 'US', "United Kingdom": 'GB', "Dominican Republic": 'DO', "Trinidad and Tobago": 'TT', "Saint Lucia": 'LC', "Saint Vincent": 'VC', "Saint Kitts": 'KN', "Antigua and Barbuda": 'AG', "Bosnia and Herzegovina": 'BA', "Central African Republic": 'CF', "Congo (Brazzaville)": 'CG', "Congo (Kinshasa)": 'CD', "Equatorial Guinea": 'GQ', "Guinea-Bissau": 'GW', "Papua New Guinea": 'PG', "Sao Tome and Principe": 'ST', "Solomon Islands": 'SB', "South Sudan": 'SS', "Timor-Leste": 'TL', "Vatican City": 'VA', "Palestinian Territories": 'PS', "Micronesia": 'FM', "Marshall Islands": 'MH', "North Macedonia": 'MK', "Eswatini": 'SZ', "Cabo Verde": 'CV', "Czechia": 'CZ', "Myanmar (Burma)": 'MM', "Laos": 'LA', "Kosovo": 'XK', "Curacao": 'CW', "Sint Maarten": 'SX', "Saint Barthelemy": 'BL', "Saint Martin": 'MF', "Caribbean Netherlands": 'BQ', "Aruba": 'AW', "Bonaire": 'BQ', "Saba": 'BQ', "Sint Eustatius": 'BQ', "Anguilla": 'AI', "Montserrat": 'MS', "Turks and Caicos": 'TC', "British Virgin Islands": 'VG', "Cayman Islands": 'KY', "Falkland Islands": 'FK', "Gibraltar": 'GI', "Bermuda": 'BM', "Greenland": 'GL', "Guernsey": 'GG', "Isle of Man": 'IM', "Jersey": 'JE', "Saint Helena": 'SH', "South Georgia": 'GS', "Saint Pierre and Miquelon": 'PM', "French Guiana": 'GF', "Guadeloupe": 'GP', "Martinique": 'MQ', "Mayotte": 'YT', "Reunion": 'RE', "Saint Martin": 'MF', "Wallis and Futuna": 'WF', "French Polynesia": 'PF', "New Caledonia": 'NC', "French Southern Territories": 'TF', "Faroe Islands": 'FO', "Aland Islands": 'AX', "Svalbard and Jan Mayen": 'SJ', "Western Sahara": 'EH', "Hong Kong SAR": 'HK', "Macao SAR": 'MO', "Taiwan": 'TW', "Kosovo": 'XK', "Palestine": 'PS', "Vatican": 'VA', "Caribbean": 'AG',
  };
  let countryKey = country || '';
  if (countryKey.includes('-')) countryKey = countryKey.split('-')[0].trim();
  if (countryKey.startsWith('East Caribbean')) countryKey = 'East Caribbean';
  if (countryKey.startsWith('Hong Kong')) countryKey = 'Hong Kong';
  if (countryKey.startsWith('Czech Republic')) countryKey = 'Czech Republic';
  if (countryKey.startsWith('South Korea')) countryKey = 'South Korea';
  if (countryKey.startsWith('North Korea')) countryKey = 'North Korea';
  if (countryKey.startsWith('Ivory Coast')) countryKey = 'Ivory Coast';
  if (countryKey.startsWith('New Zealand')) countryKey = 'New Zealand';
  if (countryKey.startsWith('United States')) countryKey = 'United States';
  if (countryKey.startsWith('United Kingdom')) countryKey = 'United Kingdom';
  if (countryKey.startsWith('Dominican Republic')) countryKey = 'Dominican Republic';
  if (countryKey.startsWith('Trinidad and Tobago')) countryKey = 'Trinidad and Tobago';
  if (countryKey.startsWith('Saint Lucia')) countryKey = 'Saint Lucia';
  if (countryKey.startsWith('Saint Vincent')) countryKey = 'Saint Vincent';
  if (countryKey.startsWith('Saint Kitts')) countryKey = 'Saint Kitts';
  if (countryKey.startsWith('Antigua and Barbuda')) countryKey = 'Antigua and Barbuda';
  if (countryKey.startsWith('Bosnia and Herzegovina')) countryKey = 'Bosnia and Herzegovina';
  if (countryKey.startsWith('Central African Republic')) countryKey = 'Central African Republic';
  if (countryKey.startsWith('Congo (Brazzaville)')) countryKey = 'Congo (Brazzaville)';
  if (countryKey.startsWith('Congo (Kinshasa)')) countryKey = 'Congo (Kinshasa)';
  if (countryKey.startsWith('Equatorial Guinea')) countryKey = 'Equatorial Guinea';
  if (countryKey.startsWith('Guinea-Bissau')) countryKey = 'Guinea-Bissau';
  if (countryKey.startsWith('Papua New Guinea')) countryKey = 'Papua New Guinea';
  if (countryKey.startsWith('Sao Tome and Principe')) countryKey = 'Sao Tome and Principe';
  if (countryKey.startsWith('Solomon Islands')) countryKey = 'Solomon Islands';
  if (countryKey.startsWith('South Sudan')) countryKey = 'South Sudan';
  if (countryKey.startsWith('Timor-Leste')) countryKey = 'Timor-Leste';
  if (countryKey.startsWith('Vatican City')) countryKey = 'Vatican City';
  if (countryKey.startsWith('Palestinian Territories')) countryKey = 'Palestinian Territories';
  if (countryKey.startsWith('Micronesia')) countryKey = 'Micronesia';
  if (countryKey.startsWith('Marshall Islands')) countryKey = 'Marshall Islands';
  if (countryKey.startsWith('North Macedonia')) countryKey = 'North Macedonia';
  if (countryKey.startsWith('Eswatini')) countryKey = 'Eswatini';
  if (countryKey.startsWith('Cabo Verde')) countryKey = 'Cabo Verde';
  if (countryKey.startsWith('Czechia')) countryKey = 'Czechia';
  if (countryKey.startsWith('Myanmar (Burma)')) countryKey = 'Myanmar (Burma)';
  if (countryKey.startsWith('Laos')) countryKey = 'Laos';
  if (countryKey.startsWith('Kosovo')) countryKey = 'Kosovo';
  countryKey = countryKey.replace(/\s*\-.*$/, '');
  const code = countryMap[countryKey.replace(/\s/g, '')] || countryMap[countryKey] || null;
  if (!code) return '🏳️';
  if (code === 'EU') return '🇪🇺';
  return code
    .toUpperCase()
    .split('')
    .map((c) => String.fromCodePoint(0x1f1e6 - 65 + c.charCodeAt(0)))
    .join('');
};

export default countryToFlag; 