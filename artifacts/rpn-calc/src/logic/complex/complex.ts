export interface Complex {
  re: number;
  im: number;
}

export function cx(re: number, im: number = 0): Complex {
  return { re, im };
}

export const ZERO: Complex = { re: 0, im: 0 };
export const NAN_COMPLEX: Complex = { re: NaN, im: NaN };
export const ONE: Complex = { re: 1, im: 0 };

export function isNaNComplex(z: Complex): boolean {
  return isNaN(z.re) || isNaN(z.im);
}

export function isPureReal(z: Complex): boolean {
  return z.im === 0;
}

export function complexFromReal(v: number): Complex {
  return { re: v, im: 0 };
}

export function add(a: Complex, b: Complex): Complex {
  return { re: a.re + b.re, im: a.im + b.im };
}

export function sub(a: Complex, b: Complex): Complex {
  return { re: a.re - b.re, im: a.im - b.im };
}

export function mul(a: Complex, b: Complex): Complex {
  return {
    re: a.re * b.re - a.im * b.im,
    im: a.re * b.im + a.im * b.re,
  };
}

export function div(a: Complex, b: Complex): Complex {
  const denom = b.re * b.re + b.im * b.im;
  if (denom === 0) {
    if (isPureReal(a) && isPureReal(b)) {
      const result = a.re / b.re;
      return isNaN(result) ? NAN_COMPLEX : { re: result, im: 0 };
    }
    return NAN_COMPLEX;
  }
  return {
    re: (a.re * b.re + a.im * b.im) / denom,
    im: (a.im * b.re - a.re * b.im) / denom,
  };
}

export function neg(z: Complex): Complex {
  return { re: -z.re, im: -z.im };
}

export function abs(z: Complex): Complex {
  return { re: Math.sqrt(z.re * z.re + z.im * z.im), im: 0 };
}

export function reciprocal(z: Complex): Complex {
  return div(ONE, z);
}

export function sqrt(z: Complex): Complex {
  if (isPureReal(z)) {
    if (z.re >= 0) return { re: Math.sqrt(z.re), im: 0 };
    return { re: 0, im: Math.sqrt(-z.re) };
  }
  const r = Math.sqrt(z.re * z.re + z.im * z.im);
  const re = Math.sqrt((r + z.re) / 2);
  const im = Math.sign(z.im) * Math.sqrt((r - z.re) / 2);
  return { re, im };
}

export function exp(z: Complex): Complex {
  const er = Math.exp(z.re);
  return { re: er * Math.cos(z.im), im: er * Math.sin(z.im) };
}

export function ln(z: Complex): Complex {
  if (isPureReal(z) && z.re <= 0) {
    if (z.re === 0) return NAN_COMPLEX;
    return { re: Math.log(-z.re), im: Math.PI };
  }
  const r = Math.sqrt(z.re * z.re + z.im * z.im);
  const theta = Math.atan2(z.im, z.re);
  return { re: Math.log(r), im: theta };
}

export function log10(z: Complex): Complex {
  if (isPureReal(z) && z.re <= 0) {
    if (z.re === 0) return NAN_COMPLEX;
    return { re: Math.log10(-z.re), im: Math.PI / Math.LN10 };
  }
  const lnVal = ln(z);
  return { re: lnVal.re / Math.LN10, im: lnVal.im / Math.LN10 };
}

export function pow(base: Complex, exponent: Complex): Complex {
  if (isNaNComplex(base) || isNaNComplex(exponent)) return NAN_COMPLEX;
  if (isPureReal(exponent) && isPureReal(base)) {
    const result = Math.pow(base.re, exponent.re);
    if (!isNaN(result)) return { re: result, im: 0 };
  }
  if (base.re === 0 && base.im === 0) {
    if (exponent.re > 0) return ZERO;
    return NAN_COMPLEX;
  }
  const lnBase = ln(base);
  return exp(mul(exponent, lnBase));
}

export function sin(z: Complex): Complex {
  return {
    re: Math.sin(z.re) * Math.cosh(z.im),
    im: Math.cos(z.re) * Math.sinh(z.im),
  };
}

export function cos(z: Complex): Complex {
  return {
    re: Math.cos(z.re) * Math.cosh(z.im),
    im: -Math.sin(z.re) * Math.sinh(z.im),
  };
}

export function tan(z: Complex): Complex {
  const s = sin(z);
  const c = cos(z);
  return div(s, c);
}

export function asin(z: Complex): Complex {
  if (isPureReal(z)) {
    const v = z.re;
    if (v >= -1 && v <= 1) return { re: Math.asin(v), im: 0 };
  }
  const i = { re: 0, im: 1 };
  const iz = mul(i, z);
  const inner = sqrt(sub({ re: 1, im: 0 }, mul(z, z)));
  const lnVal = ln(add(iz, inner));
  return { re: lnVal.im, im: -lnVal.re };
}

export function acos(z: Complex): Complex {
  if (isPureReal(z)) {
    const v = z.re;
    if (v >= -1 && v <= 1) return { re: Math.acos(v), im: 0 };
  }
  const asinVal = asin(z);
  return { re: Math.PI / 2 - asinVal.re, im: -asinVal.im };
}

export function atan(z: Complex): Complex {
  if (isPureReal(z)) return { re: Math.atan(z.re), im: 0 };
  const i = { re: 0, im: 1 };
  const iz = mul(i, z);
  const num = add({ re: 1, im: 0 }, iz);
  const den = sub({ re: 1, im: 0 }, iz);
  const lnVal = ln(div(num, den));
  return { re: lnVal.im / 2, im: -lnVal.re / 2 };
}
