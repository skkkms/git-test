export default {
  /**
   * parentElement 안에서 element의 width와 height 값을 이용하여,
   * left or right , down or up 방향을 결정하여 반환한다.
   *
   * @function retrieveCurrentPositioningStatus
   * @param {number} width
   * @param {number} height
   * @param {HTMLElement} element
   * @param {HTMLElement} parentElement
   * @return  {Object} 
   */
  retrieveCurrentPositioningStatus : (width, height, element, parentElement = null) => {
    // default: align left, shown below.
    let openedPositionLeft = true;
    let openedPositionDown = true;

    // current element
    const elemClientRect = element.getBoundingClientRect();

    if (parentElement) {
      const elemParentRect = parentElement.getBoundingClientRect();
    }

    const parentHeight = elemParentRect.height === 0 ? window.innerHeight : elemParentRect.top + elemParentRect.height;
    const spaceAbove =  elemParentRect.top - elemClientRect.top;
    const spaceBelow = parentHeight - elemClientRect.bottom;
    const hasEnoughSpaceBelow = spaceBelow > height;

    const parentWidth = elemParentRect.width === 0 ? window.innerWidth : elemParentRect.left + elemParentRect.width;
    const openedLWidth = elemClientRect.left + width;

    const hasEnoughSpaceRight = parentWidth > openedLWidth;
    
    // up or down
    if (hasEnoughSpaceBelow || spaceBelow > spaceAbove) {
      openedPositionDown = true;
    } else {
      openedPositionDown = false;
    }

    // align left or right
    if (hasEnoughSpaceRight || (elemClientRect.right - width) < elemParentRect.left) {
      openedPositionLeft = true;
    } else {
      openedPositionLeft = false;
    }

    console.log('retrieveCurrentPositioningStatus(): returns ', JSON.stringify({
      left: openedPositionLeft,
      down: openedPositionDown,
      right: !openedPositionLeft,
      up: !openedPositionDown,
    }));

    return {
      left: openedPositionLeft,
      down: openedPositionDown,
      right: !openedPositionLeft,
      up: !openedPositionDown,
    };
  },
};
