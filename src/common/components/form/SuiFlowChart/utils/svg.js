import * as d3 from 'd3';
import {approximatelyEquals} from './math';

function lineTo(g, x1, y1, x2, y2, lineWidth, strokeStyle, dash) {
  let sta = [x1, y1];
  let end = [x2, y2];
  let lineGenerator = d3.line().x(d => d[0]).y(d => d[1]);
  let path = g.append('path').
      attr('stroke', strokeStyle).
      attr('stroke-width', lineWidth).
      attr('fill', 'none').
      attr('d', lineGenerator([sta, end]));
  if (dash) {
    path.style('stroke-dasharray', dash.join(','));
  }
  return path;
}

function line2(g, x1, y1, x2, y2, startPosition, endPosition, lineWidth,
    strokeStyle, markered) {
  let points = [];
  let start = [x1, y1];
  let end = [x2, y2];
  let centerX = start[0] + (end[0] - start[0]) / 2;
  let centerY = start[1] + (end[1] - start[1]) / 2;
  let second;
  let addVerticalCenterLine = function() {
    let third = [centerX, second[1]];
    let forth = [centerX, penult[1]];
    points.push(third);
    points.push(forth);
  };
  let addHorizontalCenterLine = function() {
    let third = [second[0], centerY];
    let forth = [penult[0], centerY];
    points.push(third);
    points.push(forth);
  };
  let addHorizontalTopLine = function() {
    points.push([second[0], start[1] - 50]);
    points.push([penult[0], start[1] - 50]);
  };
  let addHorizontalBottomLine = function() {
    points.push([second[0], start[1] + 50]);
    points.push([penult[0], start[1] + 50]);
  };
  let addVerticalRightLine = function() {
    points.push([start[0] + 80, second[1]]);
    points.push([start[0] + 80, penult[1]]);
  };
  let addVerticalLeftLine = function() {
    points.push([start[0] - 80, second[1]]);
    points.push([start[0] - 80, penult[1]]);
  };
  let addSecondXPenultY = function() {
    points.push([second[0], penult[1]]);
  };
  let addPenultXSecondY = function() {
    points.push([penult[0], second[1]]);
  };

  let getSecond = function() {
    switch (startPosition) {
      case 'left':
        return [start[0] - 20, start[1]];
      case 'top':
        return [start[0], start[1] - 20];
      case 'bottom':
        return [start[0], start[1] + 20];
      default:
        return [start[0] + 20, start[1]];
    }
  }
  second = getSecond();

  let getPenult = function() {
    switch (endPosition) {
      case 'right':
        return [end[0] + 20, end[1]];
      case 'top':
        return [end[0], end[1] - 20];
      case 'bottom':
        return [end[0], end[1] + 20];
      default:
        return [end[0] - 20, end[1]];
    }
  }
  let penult = getPenult();

  points.push(start);
  points.push(second);
  startPosition = startPosition || 'right';
  endPosition = endPosition || 'left';
  let direction = getDirection(x1, y1, x2, y2);

  let getAdjustedSecond0 = function(param) {
    let adjustedSecond0 = param

    if (direction.indexOf('r') > -1) {
      if (startPosition === 'right' || endPosition === 'left') {
        if (param > centerX) {
          adjustedSecond0 = centerX;
        }
      }
    }

    if (direction.indexOf('l') > -1) {
      if (startPosition === 'left' || endPosition === 'right') {
        if (param < centerX) {
          adjustedSecond0 = centerX;
        }
      }
    }

    return adjustedSecond0
  };
  let getAdjustedSecond1 = function(param) {
    let adjustedSecond1 = param

    if (direction.indexOf('d') > -1) {
      if (startPosition === 'bottom' || endPosition === 'top') {
        if (param > centerY) {
          adjustedSecond1 = centerY;
        }
      }
    }

    if (direction.indexOf('u') > -1) {
      if (startPosition === 'top' || endPosition === 'bottom') {
        if (param < centerY) {
          adjustedSecond1 = centerY;
        }
      }
    }

    return adjustedSecond1
  };
  let getAdjustedPenult0 = function(param) {
    let adjustedPenult0 = param

    if (direction.indexOf('r') > -1) {
      if (startPosition === 'right' || endPosition === 'left') {
        if (param < centerX) {
          adjustedPenult0 = centerX;
        }
      }
    }

    if (direction.indexOf('l') > -1) {
      if (startPosition === 'left' || endPosition === 'right') {
        if (param > centerX) {
          adjustedPenult0 = centerX;
        }
      }
    }

    return adjustedPenult0
  };
  let getAdjustedPenult1 = function(param) {
    let adjustedPenult1 = param

    if (direction.indexOf('d') > -1) {
      if (startPosition === 'bottom' || endPosition === 'top') {
        if (param < centerY) {
          adjustedPenult1 = centerY;
        }
      }
    }

    if (direction.indexOf('u') > -1) {
      if (startPosition === 'top' || endPosition === 'bottom') {
        if (param > centerY) {
          adjustedPenult1 = centerY;
        }
      }
    }

    return adjustedPenult1
  };

  second[0] = getAdjustedSecond0(second[0]);
  second[1] = getAdjustedSecond1(second[1]);
  penult[0] = getAdjustedPenult0(penult[0]);
  penult[1] = getAdjustedPenult1(penult[1]);

  let doCaseLu = function() {
      if (startPosition === 'right') {
        switch (endPosition) {
          case 'top':
          case 'right':
            addSecondXPenultY();
            break;
          default: {
            addHorizontalCenterLine();
            break;
          }
        }
      } else if (startPosition === 'bottom') {
        switch (endPosition) {
          case 'top':
            addVerticalCenterLine();
            break;
          default: {
            addPenultXSecondY();
            break;
          }
        }
      } else if (startPosition === 'top') {
        switch (endPosition) {
          case 'top':
          case 'right':
            addSecondXPenultY();
            break;
          default: {
            addHorizontalCenterLine();
            break;
          }
        }
      } else {
        // startPosition is left
        switch (endPosition) {
          case 'top':
          case 'right':
            addVerticalCenterLine();
            break;
          default: {
            addPenultXSecondY();
            break;
          }
        }
      }
  };
  let doCaseU = function() {
      if (startPosition === 'right') {
        switch (endPosition) {
          case 'right': {
            break;
          }
          case 'top': {
            addSecondXPenultY();
            break;
          }
          default: {
            addHorizontalCenterLine();
            break;
          }
        }
      } else if (startPosition === 'bottom') {
        switch (endPosition) {
          case 'left':
          case 'right':
            addPenultXSecondY();
            break;
          default: {
            addVerticalRightLine();
            break;
          }
        }
      } else if (startPosition === 'top') {
        switch (endPosition) {
          case 'left': {
            addPenultXSecondY();
            break;
          }
          case 'right': {
            addHorizontalCenterLine();
            break;
          }
          case 'top':
            addVerticalRightLine();
            break;
          default: {
            break;
          }
        }
      } else {
        // left
        switch (endPosition) {
          case 'left':
          case 'right':
            break;
          default: {
            points.push([second[0], penult[1]]);
            break;
          }
        }
      }
  };
  let doCaseRu = function() {
      if (startPosition === 'right') {
        switch (endPosition) {
          case 'left': {
            addVerticalCenterLine();
            break;
          }
          case 'top': {
            addSecondXPenultY();
            break;
          }
          default: {
            addPenultXSecondY();
            break;
          }
        }
      } else if (startPosition === 'bottom') {
        switch (endPosition) {
          case 'top': {
            addVerticalCenterLine();
            break;
          }
          default: {
            addPenultXSecondY();
            break;
          }
        }
      } else if (startPosition === 'top') {
        switch (endPosition) {
          case 'right': {
            addVerticalCenterLine();
            break;
          }
          default: {
            addSecondXPenultY();
            break;
          }
        }
      } else {
        // left
        switch (endPosition) {
          case 'left':
          case 'top':
            addSecondXPenultY();
            break;
          default: {
            addHorizontalCenterLine();
            break;
          }
        }
      }
  };
  let doCaseL = function() {
      if (startPosition === 'right') {
        switch (endPosition) {
          case 'left':
          case 'right':
          case 'top':
            addHorizontalTopLine();
            break;
          default: {
            addHorizontalBottomLine();
            break;
          }
        }
      } else if (startPosition === 'bottom') {
        switch (endPosition) {
          case 'left': {
            addHorizontalBottomLine();
            break;
          }
          case 'right': {
            addSecondXPenultY();
            break;
          }
          case 'top': {
            addVerticalCenterLine();
            break;
          }
          default: {
            break;
          }
        }
      } else if (startPosition === 'top') {
        switch (endPosition) {
          case 'left': {
            addHorizontalTopLine();
            break;
          }
          case 'right': {
            addSecondXPenultY();
            break;
          }
          case 'top': {
            break;
          }
          default: {
            addVerticalCenterLine();
            break;
          }
        }
      } else {
        // left
        switch (endPosition) {
          case 'left': {
            addHorizontalTopLine();
            break;
          }
          case 'right': {
            break;
          }
          default: {
            addSecondXPenultY();
            break;
          }
        }
      }
  };
  let doCaseR = function() {
      if (startPosition === 'right') {
        switch (endPosition) {
          case 'left': {
            break;
          }
          case 'right': {
            addHorizontalTopLine();
            break;
          }
          default: {
            addSecondXPenultY();
            break;
          }
        }
      } else if (startPosition === 'bottom') {
        switch (endPosition) {
          case 'left': {
            addSecondXPenultY();
            break;
          }
          case 'right': {
            addHorizontalBottomLine();
            break;
          }
          case 'top': {
            addVerticalCenterLine();
            break;
          }
          default: {
            break;
          }
        }
      } else if (startPosition === 'top') {
        switch (endPosition) {
          case 'left': {
            addPenultXSecondY();
            break;
          }
          case 'right': {
            addHorizontalTopLine();
            break;
          }
          case 'top': {
            break;
          }
          default: {
            addVerticalCenterLine();
            break;
          }
        }
      } else {
        // left
        switch (endPosition) {
          case 'left':
          case 'right':
          case 'top':
            addHorizontalTopLine();
            break;
          default: {
            addHorizontalBottomLine();
            break;
          }
        }
      }
  };
  let doCaseLd = function() {
      if (startPosition === 'right') {
        switch (endPosition) {
          case 'left': {
            addHorizontalCenterLine();
            break;
          }
          default: {
            addSecondXPenultY();
            break;
          }
        }
      } else if (startPosition === 'bottom') {
        switch (endPosition) {
          case 'left': {
            addPenultXSecondY();
            break;
          }
          case 'top': {
            addHorizontalCenterLine();
            break;
          }
          default: {
            addSecondXPenultY();
            break;
          }
        }
      } else if (startPosition === 'top') {
        switch (endPosition) {
          case 'left':
          case 'right':
          case 'top':
            addPenultXSecondY();
            break;
          default: {
            addVerticalCenterLine();
            break;
          }
        }
      } else {
        // left
        switch (endPosition) {
          case 'left':
          case 'top':
            addPenultXSecondY();
            break;
          case 'right': {
            addVerticalCenterLine();
            break;
          }
          default: {
            addSecondXPenultY();
            break;
          }
        }
      }
  };
  let doCaseD = function() {
      if (startPosition === 'right') {
        switch (endPosition) {
          case 'left': {
            addHorizontalCenterLine();
            break;
          }
          case 'right': {
            addPenultXSecondY();
            break;
          }
          case 'top': {
            addSecondXPenultY();
            break;
          }
          default: {
            addVerticalRightLine();
            break;
          }
        }
      } else if (startPosition === 'bottom') {
        switch (endPosition) {
          case 'left':
          case 'right':
            addPenultXSecondY();
            break;
          case 'top': {
            break;
          }
          default: {
            addVerticalRightLine();
            break;
          }
        }
      } else if (startPosition === 'top') {
        switch (endPosition) {
          case 'left': {
            addVerticalLeftLine();
            break;
          }
          default: {
            addVerticalRightLine();
            break;
          }
        }
      } else {
        // left
        switch (endPosition) {
          case 'left': {
            break;
          }
          case 'right': {
            addHorizontalCenterLine();
            break;
          }
          case 'top': {
            addSecondXPenultY();
            break;
          }
          default: {
            addVerticalLeftLine();
            break;
          }
        }
      }
  };
  let isRightToLeft = function() { return startPosition === 'right' && endPosition === 'left' };
  let isRightToBottom = function() { return startPosition === 'right' && endPosition === 'bottom' };
  let isRightToTop = function() { return startPosition === 'right' && endPosition === 'top' };
  let isRightToRight = function() { return startPosition === 'right' && endPosition === 'right' };
  let isBottomToLeft = function() { return startPosition === 'bottom' && endPosition === 'left' };
  let isBottomToRight = function() { return startPosition === 'bottom' && endPosition === 'right' };
  let isBottomToTop = function() { return startPosition === 'bottom' && endPosition === 'top' };
  let isBottomToBottom = function() { return startPosition === 'bottom' && endPosition === 'bottom' };
  let isTopToLeft = function() { return startPosition === 'top' && endPosition === 'left' };
  let isTopToRight = function() { return startPosition === 'top' && endPosition === 'right' };
  let isTopToTop = function() { return startPosition === 'top' && endPosition === 'top' };
  let isTopToBottom = function() { return startPosition === 'top' && endPosition === 'bottom' };
  let isLeftToLeft = function() { return startPosition === 'left' && endPosition === 'left' };
  let isLeftToRight = function() { return startPosition === 'left' && endPosition === 'right' };
  let isLeftToTop = function() { return startPosition === 'left' && endPosition === 'top' };
  let isLeftToBottom = function() { return startPosition === 'left' && endPosition === 'bottom' };

  let doCaseRd = function() {
      if (isRightToLeft()) {
        addVerticalCenterLine();
      } else if (isRightToBottom()) {
        addSecondXPenultY();
      } else if (
          (isRightToTop()) ||
          (isRightToRight())
      ) {
        addPenultXSecondY();
      } else if (isBottomToLeft()) {
        addSecondXPenultY();
      } else if (isBottomToRight()) {
        addPenultXSecondY();
      } else if (isBottomToTop()) {
        addHorizontalCenterLine();
      } else if (isBottomToBottom()) {
        addSecondXPenultY();
      } else if (isTopToLeft()) {
        addPenultXSecondY();
      } else if (isTopToRight()) {
        addPenultXSecondY();
      } else if (isTopToTop()) {
        addPenultXSecondY();
      } else if (isTopToBottom()) {
        addVerticalCenterLine();
      } else if (isLeftToLeft()) {
        addSecondXPenultY();
      } else if (isLeftToRight()) {
        addHorizontalCenterLine();
      } else if (isLeftToTop()) {
        addHorizontalCenterLine();
      } else if (isLeftToBottom()) {
        addSecondXPenultY();
      }
  };

  let doDirection = function() {
    switch (direction) {
      case 'lu':
        doCaseLu();
        break;
      case 'u':
        doCaseU();
        break;
      case 'ru':
        doCaseRu();
        break;
      case 'l':
        doCaseL();
        break;
      case 'r':
        doCaseR();
        break;
      case 'ld':
        doCaseLd();
        break;
      case 'd':
        doCaseD();
        break;
      case 'rd':
        doCaseRd();
        break;
    }
  };
  doDirection();

  points.push(penult);
  points.push(end);

  let lines = [];
  let paths = [];
  for (let i = 0; i < points.length; i++) {
    let source = points[i];
    let destination = points[i + 1];
    lines.push({
      sourceX: source[0],
      sourceY: source[1],
      destinationX: destination[0],
      destinationY: destination[1],
    });
    let finish = i === points.length - 2;
    if (finish && markered) {
      let path = arrowTo(g, source[0], source[1], destination[0],
          destination[1], lineWidth, strokeStyle);
      paths.push(path);
      break;
    } else {
      let path = lineTo(g, source[0], source[1], destination[0], destination[1],
          lineWidth, strokeStyle);
      paths.push(path);
    }
    if (finish) {
      break;
    }
  }
  return {lines, paths};
}

function arrowTo(g, x1, y1, x2, y2, lineWidth, strokeStyle) {
  let path = lineTo(g, x1, y1, x2, y2, lineWidth, strokeStyle);
  const id = 'arrow' + strokeStyle.replace('#', '');
  g.append('marker').
      attr('id', id).
      attr('markerUnits', 'strokeWidth').
      attr('viewBox', '0 0 12 12').
      attr('refX', 9).
      attr('refY', 6).
      attr('markerWidth', 12).
      attr('markerHeight', 12).
      attr('orient', 'auto').
      append('path').
      attr('d', 'M2,2 L10,6 L2,10 L6,6 L2,2').
      attr('fill', strokeStyle);
  path.attr('marker-end', 'url(#' + id + ')');
  return path;
}

function getDirection(x1, y1, x2, y2) {
  // Use approximatelyEquals to fix the problem of css position presicion
  if (x2 < x1 && approximatelyEquals(y2, y1)) {
    return 'l';
  }
  if (x2 > x1 && approximatelyEquals(y2, y1)) {
    return 'r';
  }
  if (approximatelyEquals(x2, x1) && y2 < y1) {
    return 'u';
  }
  if (approximatelyEquals(x2, x1) && y2 > y1) {
    return 'd';
  }
  if (x2 < x1 && y2 < y1) {
    return 'lu';
  }
  if (x2 > x1 && y2 < y1) {
    return 'ru';
  }
  if (x2 < x1 && y2 > y1) {
    return 'ld';
  }
  return 'rd';
}

export {
  arrowTo,
  lineTo,
  getDirection,
  line2,
};
