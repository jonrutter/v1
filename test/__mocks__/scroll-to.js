const scrollToMock = (x, y) => null;
window.scrollTo = jest.fn().mockImplementation(scrollToMock);
