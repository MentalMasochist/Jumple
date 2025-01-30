export function gradientColor(value) {
    value = Math.min(Math.max(value, 0), 5);

    const startColor = { r: 0x11, g: 0x91, b: 0x0F };
    const middleColor = { r: 0xF6, g: 0xFA, b: 0x02 };
    const endColor = { r: 0x91, g: 0x17, b: 0x0F };

    let r, g, b;

    if (value <= 2.5) {
        const ratio = value / 2.5;
        r = Math.round(startColor.r + (middleColor.r - startColor.r) * ratio);
        g = Math.round(startColor.g + (middleColor.g - startColor.g) * ratio);
        b = Math.round(startColor.b + (middleColor.b - startColor.b) * ratio);
    } else {
        const ratio = (value - 2.5) / 2.5;
        r = Math.round(middleColor.r + (endColor.r - middleColor.r) * ratio);
        g = Math.round(middleColor.g + (endColor.g - middleColor.g) * ratio);
        b = Math.round(middleColor.b + (endColor.b - middleColor.b) * ratio);
    }
    
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    return hex;
}

export const calculateDimensions = (zoom) => {
    const size = zoom * (4 / 3) * 100;
    const minxvalue = zoom / ((8 * zoom) - 6) * 100;
    const maxxvalue = 100 - minxvalue;
    return { size, minxvalue, maxxvalue };
};

export function zoomScalar(max, zoom) {
    const normalizedZoom = (zoom - 1) / (max - 1);
    const falloffFactor = Math.pow(normalizedZoom, 2);
    return 1 + falloffFactor * (max - 1);
};

export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    const millis = Math.round((seconds % 1) * 1000);

    return `${String(minutes).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${String(millis).padStart(3, '0')}`;
}

export const countryToContinentMap = {
    'al': 'Europe', 'ad': 'Europe', 'at': 'Europe', 'by': 'Europe', 'be': 'Europe',
    'ba': 'Europe', 'bg': 'Europe', 'hr': 'Europe', 'cz': 'Europe', 'dk': 'Europe',
    'ee': 'Europe', 'fi': 'Europe', 'fr': 'Europe', 'de': 'Europe', 'gr': 'Europe',
    'hu': 'Europe', 'is': 'Europe', 'ie': 'Europe', 'it': 'Europe', 'lv': 'Europe',
    'li': 'Europe', 'lt': 'Europe', 'lu': 'Europe', 'mt': 'Europe', 'mc': 'Europe',
    'me': 'Europe', 'nl': 'Europe', 'mk': 'Europe', 'no': 'Europe', 'pl': 'Europe',
    'pt': 'Europe', 'md': 'Europe', 'ro': 'Europe', 'ru': 'Europe', 'sm': 'Europe',
    'rs': 'Europe', 'sk': 'Europe', 'si': 'Europe', 'es': 'Europe', 'se': 'Europe',
    'ch': 'Europe', 'ua': 'Europe', 'gb': 'Europe', 'va': 'Europe',
  
    'af': 'Asia', 'am': 'Asia', 'az': 'Asia', 'bh': 'Asia', 'bd': 'Asia',
    'bt': 'Asia', 'bn': 'Asia', 'kh': 'Asia', 'cn': 'Asia', 'cy': 'Asia',
    'ge': 'Asia', 'in': 'Asia', 'id': 'Asia', 'ir': 'Asia', 'iq': 'Asia',
    'il': 'Asia', 'jp': 'Asia', 'jo': 'Asia', 'kz': 'Asia', 'kw': 'Asia',
    'kg': 'Asia', 'la': 'Asia', 'lb': 'Asia', 'my': 'Asia', 'mv': 'Asia',
    'mn': 'Asia', 'mm': 'Asia', 'np': 'Asia', 'kp': 'Asia', 'om': 'Asia',
    'pk': 'Asia', 'ps': 'Asia', 'ph': 'Asia', 'qa': 'Asia', 'sa': 'Asia',
    'sg': 'Asia', 'kr': 'Asia', 'lk': 'Asia', 'sy': 'Asia', 'tw': 'Asia',
    'tj': 'Asia', 'th': 'Asia', 'tr': 'Asia', 'tm': 'Asia', 'ae': 'Asia',
    'uz': 'Asia', 'vn': 'Asia', 'ye': 'Asia',
  
    'dz': 'Africa', 'ao': 'Africa', 'bj': 'Africa', 'bw': 'Africa', 'bf': 'Africa',
    'bi': 'Africa', 'cm': 'Africa', 'cv': 'Africa', 'cf': 'Africa', 'td': 'Africa',
    'km': 'Africa', 'cg': 'Africa', 'cd': 'Africa', 'dj': 'Africa', 'eg': 'Africa',
    'gq': 'Africa', 'er': 'Africa', 'sz': 'Africa', 'et': 'Africa', 'ga': 'Africa',
    'gm': 'Africa', 'gh': 'Africa', 'gn': 'Africa', 'gw': 'Africa', 'ci': 'Africa',
    'ke': 'Africa', 'ls': 'Africa', 'lr': 'Africa', 'ly': 'Africa', 'mg': 'Africa',
    'mw': 'Africa', 'ml': 'Africa', 'mr': 'Africa', 'mu': 'Africa', 'ma': 'Africa',
    'mz': 'Africa', 'na': 'Africa', 'ne': 'Africa', 'ng': 'Africa', 'rw': 'Africa',
    'st': 'Africa', 'sn': 'Africa', 'sc': 'Africa', 'sl': 'Africa', 'so': 'Africa',
    'za': 'Africa', 'ss': 'Africa', 'sd': 'Africa', 'tz': 'Africa', 'tg': 'Africa',
    'tn': 'Africa', 'ug': 'Africa', 'zm': 'Africa', 'zw': 'Africa',

    'ag': 'North America', 'bs': 'North America', 'bb': 'North America',
    'bz': 'North America', 'ca': 'North America', 'cr': 'North America',
    'cu': 'North America', 'dm': 'North America', 'do': 'North America',
    'sv': 'North America', 'gd': 'North America', 'gt': 'North America',
    'ht': 'North America', 'hn': 'North America', 'jm': 'North America',
    'mx': 'North America', 'ni': 'North America', 'pa': 'North America',
    'kn': 'North America', 'lc': 'North America', 'vc': 'North America',
    'tt': 'North America', 'us': 'North America',

    'ar': 'South America', 'bo': 'South America', 'br': 'South America',
    'cl': 'South America', 'co': 'South America', 'ec': 'South America',
    'gy': 'South America', 'py': 'South America', 'pe': 'South America',
    'sr': 'South America', 'uy': 'South America', 've': 'South America',

    'au': 'Oceania', 'fj': 'Oceania', 'ki': 'Oceania', 'mh': 'Oceania',
    'fm': 'Oceania', 'nr': 'Oceania', 'nz': 'Oceania', 'pw': 'Oceania',
    'pg': 'Oceania', 'ws': 'Oceania', 'sb': 'Oceania', 'to': 'Oceania',
    'tv': 'Oceania', 'vu': 'Oceania'
  };
  