const defaults: Defaults = {
    symbol: '$',
    separator: ',',
    decimal: '.',
    formatWithSymbol: false,
    errorOnInvalid: false,
    precision: 2,
    pattern: '!#',
    negativePattern: '-!#',
};

const round = (v: number): number => Math.round(v);
const pow = (p: number): number => Math.pow(10, p);
const rounding = (value: number, increment: number): number =>
    round(value / increment) * increment;

const groupRegex = /(\d)(?=(\d{3})+\b)/g;
const vedicRegex = /(\d)(?=(\d\d)+\d\b)/g;

/**
 * Create a new instance of currency.js
 * @param {number|string|currency} value
 * @param {object} [opts]
 */
type Defaults = {
    symbol: string;
    separator: string;
    decimal: string;
    formatWithSymbol: boolean;
    errorOnInvalid: boolean;
    precision: number;
    pattern: string;
    negativePattern: string;
};

type Value = number | string | Currency;

type Opts = {
    increment: number;
    useVedic?: boolean;
    groups: RegExp;
};

interface Currency {
    intValue: number;
    value: number;
    _settings: Opts & Defaults;
    _precision: number;
    add(n: number): Currency;
    subtract(n: number): Currency;
    multiply(n: number): Currency;
    divide(n: number): Currency;
    distribute(n: number): Value[];
    dollars(): number;
    cents(): number;
    format(u?: boolean): string;
    toString(): string;
    toJSON(): number;
}

interface CurrencyConstructor {
    new (value: Value, opts: Opts): Currency;
    (value: Value, opts: Opts): Currency;
    prototype: Currency;
}

const currency = (function(this: Currency, value: Value, opts: Opts) {
    let that = this;

    if (!(that instanceof currency)) {
        return new currency(value, opts);
    }

    let settings = Object.assign({}, defaults, opts),
        precision = pow(settings.precision),
        v = parse(value, settings);

    that.intValue = v;
    that.value = v / precision;

    // Set default incremental value
    settings.increment = settings.increment || 1 / precision;

    // Support vedic numbering systems
    // see: https://en.wikipedia.org/wiki/Indian_numbering_system
    if (settings.useVedic) {
        settings.groups = vedicRegex;
    } else {
        settings.groups = groupRegex;
    }

    // Intended for internal usage only - subject to change
    this._settings = settings;
    this._precision = precision;
} as Function) as CurrencyConstructor;

function parse(
    value: Value,
    opts: Opts & Defaults,
    useRounding = true,
): number {
    let v = 0,
        { decimal, errorOnInvalid, precision: decimals } = opts,
        precision = pow(decimals),
        isNumber = typeof value === 'number';

    if (isNumber || value instanceof currency) {
        v =
            ((value instanceof currency ? value.value : value) as number) *
            precision;
    } else if (typeof value === 'string') {
        let regex = new RegExp('[^-\\d' + decimal + ']', 'g'),
            decimalString = new RegExp('\\' + decimal, 'g');
        v =
            +value
                .replace(/\((.*)\)/, '-$1') // allow negative e.g. (1.99)
                .replace(regex, '') // replace any non numeric values
                .replace(decimalString, '.') * precision; // convert any decimal values // scale number to integer value
        v = v || 0;
    } else {
        if (errorOnInvalid) {
            throw Error('Invalid Input');
        }
        v = 0;
    }

    // Handle additional decimal for proper rounding.
    v = +v.toFixed(4);

    return useRounding ? round(v) : v;
}

/**
 * Adds values together.
 * @param {number} number
 * @returns {currency}
 */
currency.prototype.add = function(number) {
    let { intValue, _settings, _precision } = this;
    return currency(
        (intValue += parse(number, _settings)) / _precision,
        _settings,
    );
};

/**
 * Subtracts value.
 * @param {number} number
 * @returns {currency}
 */
currency.prototype.subtract = function(number) {
    let { intValue, _settings, _precision } = this;
    return currency(
        (intValue -= parse(number, _settings)) / _precision,
        _settings,
    );
};

/**
 * Multiplies values.
 * @param {number} number
 * @returns {currency}
 */
currency.prototype.multiply = function(number) {
    let { intValue, _settings } = this;
    return currency((intValue *= number) / pow(_settings.precision), _settings);
};

/**
 * Divides value.
 * @param {number} number
 * @returns {currency}
 */
currency.prototype.divide = function(number) {
    let { intValue, _settings } = this;
    return currency((intValue /= parse(number, _settings, false)), _settings);
};

/**
 * Takes the currency amount and distributes the values evenly. Any extra pennies
 * left over from the distribution will be stacked onto the first set of entries.
 * @param {number} count
 * @returns {array}
 */
currency.prototype.distribute = function(count) {
    let { intValue, _precision, _settings } = this,
        distribution: Value[] = [],
        split = Math[intValue >= 0 ? 'floor' : 'ceil'](intValue / count),
        pennies = Math.abs(intValue - split * count);

    for (; count !== 0; count--) {
        let item = currency(split / _precision, _settings);

        // Add any left over pennies
        pennies-- > 0 &&
            (item =
                intValue >= 0
                    ? item.add(1 / _precision)
                    : item.subtract(1 / _precision));

        distribution.push(item);
    }

    return distribution;
};

/**
 * Returns the dollar value.
 * @returns {number}
 */
currency.prototype.dollars = function() {
    return ~~this.value;
};

/**
 * Returns the cent value.
 * @returns {number}
 */
currency.prototype.cents = function() {
    let { intValue, _precision } = this;
    return ~~(intValue % _precision);
};

/**
 * Formats the value as a string according to the formatting settings.
 * @param {boolean} useSymbol - format with currency symbol
 * @returns {string}
 */
currency.prototype.format = function(useSymbol) {
    let {
            pattern,
            negativePattern,
            formatWithSymbol,
            symbol,
            separator,
            decimal,
            groups,
        } = this._settings,
        values = (this + '').replace(/^-/, '').split('.'),
        dollars = values[0],
        cents = values[1];

    // set symbol formatting
    typeof useSymbol === 'undefined' && (useSymbol = formatWithSymbol);

    return (this.value >= 0 ? pattern : negativePattern)
        .replace('!', useSymbol ? symbol : '')
        .replace(
            '#',
            `${dollars.replace(groups, '$1' + separator)}${
                cents ? decimal + cents : ''
            }`,
        );
};

/**
 * Formats the value as a string according to the formatting settings.
 * @returns {string}
 */
currency.prototype.toString = function() {
    let { intValue, _precision, _settings } = this;
    return rounding(intValue / _precision, _settings.increment).toFixed(
        _settings.precision,
    );
};

/**
 * Value for JSON serialization.
 * @returns {float}
 */
currency.prototype.toJSON = function() {
    return this.value;
};

export default currency;
