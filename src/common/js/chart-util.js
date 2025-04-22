// eslint-disable-next-line import/no-unresolved
import linePatSolid from 'images/line_pat_solid.png';
// eslint-disable-next-line import/no-unresolved
import linePatDashed from 'images/line_pat_dashed.png';
// eslint-disable-next-line import/no-unresolved
import linePatDotted from 'images/line_pat_dotted.png';

import lineBulletLine from 'images/line_bullet_no.png';
import lineBulletCircle from 'images/line_bullet_circle.png';
import lineBulletStar from 'images/line_bullet_star.png';
import lineBulletTriangle from 'images/line_bullet_triangle.png';

const CONSTANTS_LINE_PATTERNS = {
    SOLID: {
        img: linePatSolid,
        name: 'Solid',
        value: [1, 0],
    },
    DASHED: {
        img: linePatDashed,
        name: 'Dashed',
        value: [6, 3],
    },
    DOTTED: {
        img: linePatDotted,
        name: 'Dotted',
        value: [2, 3],
    },
};

const CONSTANTS_LINE_POINTSTYLES = {
    LINE: {
        img: lineBulletLine,
        name: 'Line',
        pointStyle: 'line',
    },
    CIRCLE: {
        img: lineBulletCircle,
        name: 'Circle',
        pointStyle: 'circle',
    },
    STAR: {
        img: lineBulletStar,
        name: 'Star',
        pointStyle: 'star',
    },
    TRIANGLE: {
        img: lineBulletTriangle,
        name: 'Triangle',
        pointStyle: 'triangle',
    },
};

export default {
    CONSTANTS_LINE_PATTERNS,
    CONSTANTS_LINE_POINTSTYLES,
    getLinePatternOptionValue: linePatternName => {
        const PATTERN_KEY = _.findKey(CONSTANTS_LINE_PATTERNS, itm => itm.name === linePatternName);
        if (PATTERN_KEY) {
            return CONSTANTS_LINE_PATTERNS[PATTERN_KEY].value;
        } else {
            return CONSTANTS_LINE_PATTERNS["SOLID"].value;
        }
    },
    getLinePatternOptionName: linePatternValue => {
        const PATTERN_KEY = _.findKey(CONSTANTS_LINE_PATTERNS, itm => _.isEqual(itm.value, linePatternValue));
        if (PATTERN_KEY) {
            return CONSTANTS_LINE_PATTERNS[PATTERN_KEY].name;
        } else {
            return CONSTANTS_LINE_PATTERNS["SOLID"].name;
        }
    },
    getLinePointStyleValue: lineBulletName => {
        const BULLET_KEY = _.findKey(CONSTANTS_LINE_POINTSTYLES, itm => itm.name === lineBulletName);
        if (BULLET_KEY) {
            return CONSTANTS_LINE_POINTSTYLES[BULLET_KEY].pointStyle;
        } else {
            return CONSTANTS_LINE_POINTSTYLES["CIRCLE"].pointStyle;
        }
    },
    getLinePointStyleName: lineBulletValue => {
        const BULLET_KEY = _.findKey(CONSTANTS_LINE_POINTSTYLES, itm => _.isEqual(itm.pointStyle, lineBulletValue));
        if (BULLET_KEY) {
            return CONSTANTS_LINE_POINTSTYLES[BULLET_KEY].name;
        } else {
            return CONSTANTS_LINE_POINTSTYLES["CIRCLE"].name;
        }
    },
    chartTickColorCallback: (isCurrentValue, isCurrentColor = 'red', normalColor = 'black') => {
        return (chart) => {
            return (chart && chart.tick && chart.tick.label === isCurrentValue) ? isCurrentColor : normalColor;
        }
    },    
}