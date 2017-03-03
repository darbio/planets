import { HubblePage } from './app.po';

describe('hubble App', () => {
  let page: HubblePage;

  beforeEach(() => {
    page = new HubblePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
