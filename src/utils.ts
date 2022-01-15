import { css } from 'styled-components';

export enum RelativeUnit {
  EM,
  REM,
}

export enum Breakpoints {
  XS = 0,
  SM = 576,
  MD = 768,
  LG = 992,
  XL = 1200,
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

/**
 * @example
 *   breakpoint(Breakpoint.SM)`
 *     color: red;
 *   `;
 * @param bp A breakpoint.
 * @param shouldDisplay True if the breakpoint should be displayed; False otherwise.
 */
function breakpoint(bp: Breakpoints, shouldDisplay = true) {
  return (content: any) => {
    return shouldDisplay
      ? css`
          @media (min-width: ${bp}px) {
            ${content}
          }
        `
      : '';
  };
}

function spacingUtilityClasses(steps: { [key: string]: string }) {
  const properties: { [key: string]: string[] } = {
    mt: ['margin-top'],
    mr: ['margin-right'],
    mb: ['margin-bottom'],
    ml: ['margin-left'],
    my: ['margin-top', 'margin-bottom'],
    mx: ['margin-left', 'margin-right'],
    pt: ['padding-top'],
    pr: ['padding-right'],
    pb: ['padding-bottom'],
    pl: ['padding-left'],
    py: ['padding-top', 'padding-bottom'],
    px: ['padding-left', 'padding-right'],
  };

  let result = '';

  Object.keys(steps).forEach((step) => {
    Object.keys(properties).forEach((property) => {
      const className = `u-${property}--${step}`;
      const cssProperties: string[] = [];

      properties[property].forEach((cssProperty) => {
        cssProperties.push(`${cssProperty}: ${steps[step]} !important;\n`);
      });

      result += `
        ${forEachBreakpoint(className)`
          ${cssProperties.join('')}
        `}
      `;
    });
  });

  return result;
}

function forEachBreakpoint(className: string) {
  return (cssProperties: TemplateStringsArray, ...interpolations: string[]) => {
    const css = [cssProperties[0]];

    for (let i = 0, len = interpolations.length; i < len; i++) {
      css.push(interpolations[i], cssProperties[i + 1]);
    }

    const selector = (bp: string) => `.${className}\\:${`${bp}`}`;

    const xsCss = `
      @media (min-width: ${Breakpoints.XS}px) {
        ${selector('xs')} {
          ${css.join('')}
        }
      }
    `;

    const smCss = `
      @media (min-width: ${Breakpoints.SM}px) {
        ${selector('sm')} {
          ${css.join('')}
        }
      }
    `;

    const mdCss = `
      @media (min-width: ${Breakpoints.MD}px) {
        ${selector('md')} {
          ${css.join('')}
        }
      }
    `;

    const lgCss = `
      @media (min-width: ${Breakpoints.LG}px) {
        ${selector('lg')} {
          ${css.join('')}
        }
      }
    `;

    const xlCss = `
      @media (min-width: ${Breakpoints.XL}px) {
        ${selector('xl')} {
          ${css.join('')}
        }
      }
    `;

    return `${xsCss}\n${smCss}\n${mdCss}\n${lgCss}\n${xlCss}`;
  };
}

export {
  verticalRhythm,
  modularScaleRem,
  pxToRelativeUnit,
  breakpoint,
  spacingUtilityClasses,
  forEachBreakpoint,
};
