// @ts-nocheck
import { Question, ElementFactory, StylesManager } from "survey-core";

const QUESTION_TYPE = "myquestion";

// StylesManager.applyTheme("defaultV2");

export function registerMyQuestion() {
  ElementFactory.Instance.registerElement(QUESTION_TYPE, (name) => {
    return new MyQuestionModel(name);
  });
}

export class MyQuestionModel extends Question {
  getType() {
    return QUESTION_TYPE;
  }

  get text() {
    return this.getPropertyValue("text", "");
  }
  set text(newValue) {
    this.setPropertyValue("text", newValue);
  }
}
