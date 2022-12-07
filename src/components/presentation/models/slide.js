const Base = require("../../db/models/Base.model");
module.exports = class Slide extends Base.BaseModel {
  presentationID;
  question;
  time;
  image;
  order;

  initTable(table) {
    super.initTable(table);
    table.uuid("presentation_id");
    table.string("question");
    table.string("image");
    table.integer("order");
    table.timestamp("time");
  }
};
