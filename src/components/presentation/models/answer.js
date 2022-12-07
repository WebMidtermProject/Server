const Base = require("../../db/models/Base.model");
module.exports = class Answer extends Base.BaseModel {
  slideID;
  isCorrectAnswer;
  title;

  initTable(table) {
    super.initTable(table);
    table.uuid("slide_id");
    table.boolean("is_correct_answer");
    table.string("title");
  }
};
