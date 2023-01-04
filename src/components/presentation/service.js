const knex = require("../db/configs/db-connector");

createPresentationService = async (user, title) => {
  newPresentation = { title: title, creator_id: user.id };

  existedPresentation = await knex("Presentation")
    .where("title", title)
    .first();
  if (existedPresentation !== undefined) {
    return null;
  }

  presentation = await knex("Presentation")
    .insert(newPresentation)
    .returning("*");
  if (presentation.length == 0) {
    return null;
  }

  return presentation;
};

getPresentation = async (user, id) => {
  presentation = await knex("Presentation").where({ id: id }).first();

  if (presentation == undefined || presentation.length == 0) {
    return null;
  }

  return presentation;
};

deletePresentation = async (user, id) => {
  presentation = await knex("Presentation")
    .where({ id: id })
    .where("creator_id", user.id)
    .delete()
    .returning("*");

  if (presentation == undefined || presentation.length == 0) {
    return false;
  }

  return true;
};

createSlide = async (user, presentation_id, question, time, image) => {
  newSlide = {
    presentation_id: presentation_id,
    question: question,
    image: image,
    order: 1
  };

  maxOrder = await knex("Slide").where("presentation_id",presentation_id).orderBy('order','desc').first('order')
  if (maxOrder.order !== undefined && maxOrder.order !== null&& maxOrder.order!== NaN ){
    newSlide.order = +maxOrder + 1
  }
  console.log(newSlide)

  slide = await knex("Slide").insert(newSlide).returning("*");
  if (slide.length == 0) {
    return null;
  }

  return slide;
};

getSlide = async (user, presentation_id, order) => {
  var slide;
  if (order !== undefined && order != null) {
    slide = await knex("Slide").where('order',order).orderBy('order','asc').select('id','question','image','order','time');
  }else{
    slide = await knex("Slide").orderBy('order','asc').select('id','question','image','order','time');
  }

  if (slide == undefined || slide.length == 0) {
    return null;
  }

  return slide;
};
getSlideDetail= async(user, presentation_id, id) =>{
  var slide;
  slide = await knex("Slide").where('presentation_id',presentation_id).where('id',id).first('id','question','image','order','time');


  if (slide == undefined || slide == null) {
    return null;
  }

  return slide;
}

getMyPresentation= async(user) =>{
  var slide;
  slide = await knex("Presentation").where('creator_id',user.id).first('id','title');


  if (slide == undefined || slide == null) {
    return null;
  }

  return slide;
}

module.exports = {
  createPresentationService,
  getPresentation,
  deletePresentation,
  createSlide,
  getSlide,
  getSlideDetail,
  getMyPresentation
};
