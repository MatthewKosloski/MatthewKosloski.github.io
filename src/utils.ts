export enum RelativeUnit {
	EM,
	REM,
}

export enum Steps {
	ZERO = 0,
	QUARTER = 0.25,
	HALF = 0.5,
	THREEFOURTHS = 0.75,
	ONE = 1,
	TWO = 2,
	THREE = 3,
	FOUR = 4,
	FIVE = 5,
}

/**
 * Returns a multiple of the ratio in relative units.
 * Use this relative unit value to achieve vertical rhythm by having
 * consistent spacing between elements.
 *
 * @param step How many steps up from the ratio.`
 * @param ratio A ratio.
 * @param unit The type of relative unit to return.
 * @returns A vertical rhythm value in relative units.
 */
function verticalRhythm(step: Steps, ratio: number, unit: RelativeUnit) {
	const vrUnitless = ratio * step;
	return unit === RelativeUnit.EM ? `${vrUnitless}em` : `${vrUnitless}rem`;
}

/**
 * Returns a value on the modular scale in rem units. The modular 
 * scale is a set of values obtained from a base ratio.
 * 
 * @see https://www.modularscale.com/

 * @param step The step on the modular scale.
 * @param ratio The base ratio.
 * @returns A value at the given step on the modular scale, in rem units.
 */
function modularScaleRem(step: Steps, ratio: number) {
	return `${Math.pow(ratio, step)}rem`;
}

/**
 * Converts the given quantity in pixels to an equivalent value in relative units.
 *
 * @param px A quantity of pixels.
 * @param ratio The root font size ratio.
 * @param unit The type of relative unit to return.
 * @returns The given pixel value in relative units.
 */
function pxToRelativeUnit(px: number, ratio: number, unit: RelativeUnit) {
	const pxToRelUnitless = px / (ratio * 0.16);
	return unit === RelativeUnit.EM
		? `${pxToRelUnitless}em`
		: `${pxToRelUnitless}rem`;
}

export { verticalRhythm, modularScaleRem, pxToRelativeUnit };
