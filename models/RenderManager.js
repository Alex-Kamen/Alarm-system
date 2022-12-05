export class RenderManager {
  objectList = [];

  fieldSettings = {
    positionX: 0,
    positionY: 0,
    zoom: 1
  }

  constructor(objectList, fieldSettings) {
    this.objectList.push(...objectList.building, ...objectList.sensors);
    this.fieldSettings = fieldSettings || {};
  }

  render() {
    this.objectList.forEach(object => object.drawObject({fieldPosition: this.fieldSettings}));

    return this;
  }

  hover(event = {}) {
    this.objectList.forEach(object => {
      if (object.isHover(event.offsetX, event.offsetY, this.fieldSettings)
        && object.hoverEffect) {

        object.hoverEffect(this.fieldSettings);
      }

      if (object.linkHoverEffect) {
        object.linkHoverEffect(event.offsetX, event.offsetY, this.fieldSettings);
      }
    });

    return this;
  }

  activate() {
    this.objectList.forEach(object => {
      if (object.active) {
        object.activeEffect(this.fieldSettings);
      }
    });

    return this;
  }
}
