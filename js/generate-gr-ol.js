/**  Ligatures
 * 
 * Some of the ancient-greek letters used in the Ionic numerals are deprecated
 * in the modern greek alphabet, thus some letter combos are used instead;
 * 
 * depricated : number          : combo
 * ---------- | --------------- | -------------------------
 * stigma (Ϛ) | represends `6`  | sigma-tau combo (στ)
 * koppa (Ϟ)  | 90              | -- no alternative combo --
 * sampi (Ϡ)  | 900             | -- no alternative combo --
 * 
 */

const greekIonicNumber = (num, stigma = true, lowerCase = true, keraia = true ) => {

    if (num > 999999)   return false;
    
    let suffix = (keraia) ? '´' : '';
    let prefix = (num > 999) ? '͵' : '';
    var matrix = (lowerCase)
        ? {     // lowerCase matrixes
            signles   : ['', 'α', 'β', 'γ', 'δ', 'ε',
                                ((stigma) ? 'ϛ' : 'στ'),
                                                 'ζ', 'η', 'θ' ],

            decades   : ['', 'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π', 'ϟ' ],

            hundreds  : ['', 'ρ', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω', 'ϡ' ]
        }
        : {     // upperCase matrixes
            signles   : ['', 'Α', 'Β', 'Γ', 'Δ', 'Ε',
                                ((stigma) ? 'Ϛ' : 'ΣΤ'),
                                                 'Ζ', 'Η', 'θ' ],

            decades   : ['', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ϟ' ],

            hundreds  : ['', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω', 'Ϡ' ]
        };
    
    // separate thousands
    thousands = Math.floor(num / 1000);
    hundreds = num % 1000;

    var th = td = ts = hh = hd = hs = 0;
    var thousandsStr = '';
    var hundredsStr = '';

    if (thousands != 0) {
        th = Math.floor(thousands/100);     // thousand's hundreds
        td = Math.floor((thousands - (th*100))/10);     // thousand's decades
        ts = thousands % 10;        // thousand's singledigits

        thousandsStr = `${prefix}${matrix.hundreds[th]}${matrix.decades[td]}${matrix.signles[ts]}`;
    }

    hh = Math.floor(hundreds/100);     // hundred's hundreds
    hd = Math.floor((hundreds - (hh*100))/10);     // hundred's decades
    hs = hundreds % 10;        // hundred's singledigits

    hundredsStr = `${matrix.hundreds[hh]}${matrix.decades[hd]}${matrix.signles[hs]}`;

    return `${thousandsStr}${hundredsStr}${suffix}`;
};


const generateIonic_OL_Css = (limit, options = {}) => {

    if (limit > 999999) {
         attachCss('/*  */\n');

    } else {

        // define main parametres
        // --- -- -- - - -
        var stigma = options.hasOwnProperty('stigma') ? options.stigma : true;
        var lowerCase = options.hasOwnProperty('lowerCase') ? options.lowerCase : true;
        var keraia = options.hasOwnProperty('keraia') ? options.keraia : true;
        var olClass = options.hasOwnProperty('class')
            ? ('.' + options.class)
            : ( lowerCase
                ? "[style*='list-style-type: lower-greek']"
                : "[style*='list-style-type: upper-greek']"
            );
        var openStr = options.hasOwnProperty('openStr') ? options.openStr : '';
        var closeStr = options.hasOwnProperty('closeStr') ? options.closeStr : '.';
        var marginLeft = options.hasOwnProperty('marginLeft') ? options.marginLeft : '-32px';
        var liWidth = options.hasOwnProperty('width') ? options.width : '32px';

        // general ol css rules
        // --- -- -- - - -
        var rules = [
            '/*!',
            ' * ionic-greek numbering',
            ' * Licensed under Apache 2.0 (https://github.com/callmepi/greek-ol/blob/main/LICENSE)',
            ' * ',
            ' * Auto generated file;',
            ` * <ol> class selector: ${olClass}`,
            ' * params: '+ ((stigma) ?'stigma-' :'') + ((keraia) ?'keraia-' :'') + ((lowerCase) ?'lc-' :'UC-') + limit,
            ` * open: "${openStr}" ; close: "${closeStr}"`,
            ' */',

            `ol${olClass} { list-style-type: none; }`,

            `ol${olClass} li:before {`,
            `    display: inline-block;`,
            `    margin-left: -${marginLeft}; width: ${liWidth};`,
            `}`

        ].join('\n');

        for (i=1 ; i < (limit+1) ; i++ ) {
            ionicStr = greekIonicNumber(i, stigma, lowerCase, keraia);
            rules += [
                `\nol${olClass} li:nth-child(${i}):before {`,
                `   content: "${openStr}${ionicStr}${closeStr}";`,
                '}'
            ].join('\n')
        }

        attachCss(rules + '\n');
    }
};

const attachCss = (styles) => {
    var styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    // console.log(styles);
    document.head.appendChild(styleSheet);
}


// generateIonic_OL_Css(30);

export { generateIonic_OL_Css }
