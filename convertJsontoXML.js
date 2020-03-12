const builder = require('xmlbuilder');
const fs = require('fs');

const dataArray = require('./jsonInput.json');

const xml = builder.create('toc');

const buildNestedElement = (xml, data) => {
  const newTopic = xml;
  data.forEach(element => {
    const child = newTopic.ele('topic', {
      label: element.text,
      href: element.url
    });
    return getXMLTopic(child, element.children);
  });
  return newTopic;
};

const getXMLTopic = (xml, data) => {
  const newTopic = xml;
  if (!data) return newTopic;
  if (!data.children) {
    return buildNestedElement(newTopic, data);
  }
  return buildNestedElement(newTopic, data.children);
};

const result = getXMLTopic(xml, dataArray);
fs.writeFileSync('restl.xml', result.end({ pretty: true }));
