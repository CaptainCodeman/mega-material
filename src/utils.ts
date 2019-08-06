let _supportsPassive = false;

try {
  const opts = Object.defineProperty({}, 'passive', {
    get: function() {
      _supportsPassive = true;
    }
  });
  const handler = (e: Event) => {}
  window.addEventListener("testPassive", handler, opts);
  window.removeEventListener("testPassive", handler, false);
} catch (e) {}

export const supportsPassive = _supportsPassive;

export const passiveOrFalse = supportsPassive ? { passive: true } : false

export function matches(element: Element, selector: string): boolean {
    const nativeMatches = element.matches || element.webkitMatchesSelector;
    return nativeMatches.call(element, selector);
}

export interface Point {
    x: number;
    y: number;
}

export function getNormalizedEventCoords(evt: Event | undefined, pageOffset: Point, clientRect: ClientRect):
    Point {
    if (!evt) {
        return { x: 0, y: 0 };
    }
    const { x, y } = pageOffset;
    const documentX = x + clientRect.left;
    const documentY = y + clientRect.top;

    let normalizedX;
    let normalizedY;
    // Determine touch point relative to the ripple container.
    if (evt.type === 'touchstart') {
        const touchEvent = evt as TouchEvent;
        normalizedX = touchEvent.changedTouches[0].pageX - documentX;
        normalizedY = touchEvent.changedTouches[0].pageY - documentY;
    } else {
        const mouseEvent = evt as MouseEvent;
        normalizedX = mouseEvent.pageX - documentX;
        normalizedY = mouseEvent.pageY - documentY;
    }

    return { x: normalizedX, y: normalizedY };
}

