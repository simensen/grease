import * as Common from './common';

describe('@grease/common', () => {
  it('should export all utility modules', () => {
    expect(Common.waitForElement).toBeDefined();
    expect(Common.createElement).toBeDefined();
    expect(Common.safeJsonParse).toBeDefined();
    expect(Common.debounce).toBeDefined();
    expect(Common.EventEmitter).toBeDefined();
  });
});
