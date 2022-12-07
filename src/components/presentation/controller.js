const Presentation = require("./models/presentation");
const service = require("./service");

getPresentation = async (req, res) => {
  user = req["currentUser"];
  if (user === undefined) {
    return res.status(400).json({ Error: "Invalid user" });
  }

  const { id } = req.params;
  try {
    data = await service.getPresentation(user, id);
    if (data === null || data === undefined || data.length === 0) {
      return res.status(400).json({ Error: "Error occur" });
    }
    return res.status(200).json({ data: data });
  } catch {
    return res.status(404);
  }
};

createPresentation = async (req, res) => {
  user = req["currentUser"];
  if (user === undefined) {
    return res.status(400).json({ Error: "Invalid user" });
  }

  const { title } = req.body;
  if (title === "" || title === undefined) {
    return res.status(400).json({ Error: "Invalid title" });
  }

  presentation = await service.createPresentationService(user, title);
  if (
    presentation === null ||
    presentation === undefined ||
    presentation.length === 0
  ) {
    return res.status(400).json({ Error: "Error occur" });
  }

  return res.status(200).json({ data: presentation });
};

deletePresentation = async (req, res) => {
  user = req["currentUser"];
  if (user === undefined) {
    return res.status(400).json({ Error: "Invalid user" });
  }

  const { id } = req.params;
  if (id === "" || id === undefined) {
    return res.status(400).json({ Error: "Invalid ID" });
  }

  presentation = await service.deletePresentation(user, id);
  if (presentation === false) {
    return res.status(400).json({ Error: "Error occur" });
  }

  return res.status(200).json({ data: presentation });
};

createSlide = async (req, res) => {
  user = req["currentUser"];
  if (user === undefined) {
    return res.status(400).json({ Error: "Invalid user" });
  }

  const { presentation_id } = req.params;
  const { question, time, image } = req.body;
  if (question === "" || question === undefined) {
    return res.status(400).json({ Error: "Invalid question" });
  }

  slide = await service.createSlide(
    user,
    presentation_id,
    question,
    time,
    image
  );
  if (slide === null || slide === undefined || slide.length === 0) {
    return res.status(400).json({ Error: "Error occur" });
  }

  return res.status(200).json({ data: slide });
};
getSlide = async (req, res) => {
  user = req["currentUser"];
  if (user === undefined) {
    return res.status(400).json({ Error: "Invalid user" });
  }

  const { presentation_id } = req.params;
  const { order } = req.query;
  try {
    data = await service.getSlide(user, presentation_id, order);
    if (data === null || data === undefined || data.length === 0) {
      return res.status(400).json({ Error: "Error occur" });
    }
    return res.status(200).json({ data: data });
  } catch {
    return res.status(404);
  }
};

getSlideDetail = async (req, res) => {
  user = req["currentUser"];
  if (user === undefined) {
    return res.status(400).json({ Error: "Invalid user" });
  }

  const { presentation_id,id } = req.params;
  try {
    data = await service.getSlideDetail(user, presentation_id, id);
    if (data === null || data === undefined || data.length === 0) {
      return res.status(400).json({ Error: "Error occur" });
    }
    return res.status(200).json({ data: data });
  } catch {
    return res.status(404);
  }
};

module.exports = {
  createPresentation,
  getPresentation,
  deletePresentation,
  createSlide,
  getSlide,
  getSlideDetail
};
