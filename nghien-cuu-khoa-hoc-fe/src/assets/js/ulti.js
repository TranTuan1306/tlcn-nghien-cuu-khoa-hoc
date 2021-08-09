function xPathClick(path) {
  try {
    document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
  }
  catch (e) {

  }
}
